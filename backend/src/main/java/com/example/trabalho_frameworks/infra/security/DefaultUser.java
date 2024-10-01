package com.example.trabalho_frameworks.infra.security;

import com.example.trabalho_frameworks.dtos.CadastroRequestDTO;
import com.example.trabalho_frameworks.services.AuthenticationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.logging.Logger;

@Configuration
public class DefaultUser implements CommandLineRunner {
    private static final Logger LOGGER = Logger.getLogger(DefaultUser.class.getName());

    @Autowired
    private AuthenticationService authService;

    @Override
    @Transactional
    public void run(String... args) {
        CadastroRequestDTO novoUsuario = new CadastroRequestDTO("padrao", "padrao@gmail.com", "123");
        try {
            authService.cadastrar(novoUsuario);
        } catch (Exception e) {
            LOGGER.warning("Usuario Super já existe.");
        }
    }

}