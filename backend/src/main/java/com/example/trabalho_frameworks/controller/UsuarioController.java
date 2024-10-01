package com.example.trabalho_frameworks.controller;

import com.example.trabalho_frameworks.dtos.CadastroRequestDTO;
import com.example.trabalho_frameworks.dtos.LoginReponseDTO;
import com.example.trabalho_frameworks.dtos.LoginRequestDTO;
import com.example.trabalho_frameworks.entities.UsuarioEntity;
import com.example.trabalho_frameworks.repository.UsuarioRepository;
import com.example.trabalho_frameworks.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private AuthenticationService authenticationService;

    
    @PostMapping("/cadastrar")
    public LoginReponseDTO adicionarUsuario(@RequestBody CadastroRequestDTO usuario) {
        return authenticationService.cadastrar(usuario);
    }

    @PostMapping("/login")
    public LoginReponseDTO login(@RequestBody LoginRequestDTO usuario) {
        return authenticationService.doLogin(usuario);
    }
}
