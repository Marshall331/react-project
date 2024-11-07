package com.kindsonthegenius.product_app.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class GenerateRandomToken {

    // Méthode pour générer un token aléatoire de 20 caractères
    public static String generate() {
        SecureRandom random = new SecureRandom();

        byte[] tokenBytes = new byte[15];
        random.nextBytes(tokenBytes);

        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
        return token.substring(0, 20);
    }
}
