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
    @Autowired
    private UsuarioRepository usuarioRepository;



    @GetMapping("/all")
    public List<UsuarioEntity> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/add")
    public LoginReponseDTO adicionarUsuario(@RequestBody CadastroRequestDTO usuario) {
        return authenticationService.cadastrar(usuario);
    }

    @GetMapping("/{id}")
    public UsuarioEntity obterUsuarioPorId(@PathVariable UUID id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public UsuarioEntity atualizarUsuario(@PathVariable UUID id, @RequestBody UsuarioEntity usuarioAtualizado) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNome(usuarioAtualizado.getNome());
                    usuario.setEmail(usuarioAtualizado.getEmail());
                    usuario.setSenha(usuarioAtualizado.getSenha());
                    return usuarioRepository.save(usuario);
                }).orElse(null);
    }

    @PostMapping("/login")
    public LoginReponseDTO login(@RequestBody LoginRequestDTO usuario) {
        return authenticationService.doLogin(usuario);
    }
}
