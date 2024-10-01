package com.example.trabalho_frameworks.infra.security;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.logging.Logger;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Component
public class RSAKeys {
    private static final Logger LOGGER = Logger.getLogger(RSAKeys.class.getName());

    @Value("${api.security.rsa.public-key}")
    private String publicKey;

    @Value("${api.security.rsa.private-key}")
    private String privateKey;


    public String getPublicKey() {
        if (publicKey == null || publicKey.isEmpty() || publicKey.equals("null")) {
            gerarChavesRSA();
            return publicKey;
        }
        return publicKey;
    }

    public String getPrivateKey() {
        if (privateKey == null || privateKey.isEmpty() || privateKey.equals("null")) {
            gerarChavesRSA();
            return privateKey;
        }
        return privateKey;
    }

    private void gerarChavesRSA() {
        try {
            LOGGER.info("Gerando chaves RSA...");
            KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
            keyGen.initialize(2048);
            KeyPair pair = keyGen.generateKeyPair();

            this.publicKey = pair.getPublic().toString();
            this.privateKey = pair.getPrivate().toString();
            LOGGER.info("Chaves geradas com sucesso!");
        }
        catch (NoSuchAlgorithmException ex) {
            LOGGER.severe("Erro ao gerar chaves RSA. Algoritmo não encontrado.");
            LOGGER.severe(Arrays.toString(ex.getStackTrace()));
            System.exit(1);
        }
    }

}
