package com.jpettit.jobapplicationbackend.services;

import com.jpettit.jobapplicationbackend.enums.EnvironmentVars;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final EnvironmentService environmentService;

    @Autowired
    public JwtService (final EnvironmentService environmentService) {
        this.environmentService = environmentService;
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateToken(Map<String, Object> extractClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);

        return doUsernamesMatch(username, userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean doUsernamesMatch(String given, String userDetailsUsername) {
        return given.equals(userDetailsUsername);
    }

    public boolean isTokenExpired(String token) {
        return extractExpirationDateFromToken(token).before(new Date());
    }

    private Date extractExpirationDateFromToken(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Key getSignInKey() {
        final String secretKey = environmentService.getEnvironmentVarOrDefault(EnvironmentVars.JOBAPP_SECRETKEY, "");

        if (secretKey.equals("")) {
            final String message = "Couldn't get secret key.";
            throw new RuntimeException(message);
        }

        byte[] keyBytes = Decoders.BASE64.decode(secretKey);

        return Keys.hmacShaKeyFor(keyBytes);
    }
}
