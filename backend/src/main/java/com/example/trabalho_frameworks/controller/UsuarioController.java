package com.example.trabalho_frameworks.controller;

import com.example.trabalho_frameworks.entities.UsuarioEntity;
import com.example.trabalho_frameworks.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<UsuarioEntity> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public UsuarioEntity adicionarUsuario(@RequestBody UsuarioEntity usuario) {
        return usuarioRepository.save(usuario);
    }

    @GetMapping("/{id}")
    public UsuarioEntity obterUsuarioPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public UsuarioEntity atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioEntity usuarioAtualizado) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNome(usuarioAtualizado.getNome());
                    usuario.setEmail(usuarioAtualizado.getEmail());
                    usuario.setSenha(usuarioAtualizado.getSenha());
                    return usuarioRepository.save(usuario);
                }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void removerUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }
}
