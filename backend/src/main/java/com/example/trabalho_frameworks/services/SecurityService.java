package com.example.trabalho_frameworks.services;

import com.example.trabalho_frameworks.entities.UsuarioEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    public UsuarioEntity getUsuario() {
        return (UsuarioEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
