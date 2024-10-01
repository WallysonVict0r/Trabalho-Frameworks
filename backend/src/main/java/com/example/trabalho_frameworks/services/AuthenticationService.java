package com.example.trabalho_frameworks.services;
import com.example.trabalho_frameworks.dtos.CadastroRequestDTO;
import com.example.trabalho_frameworks.dtos.LoginReponseDTO;
import com.example.trabalho_frameworks.dtos.LoginRequestDTO;
import com.example.trabalho_frameworks.entities.UsuarioEntity;
import com.example.trabalho_frameworks.exceptions.ValidationException;
import com.example.trabalho_frameworks.infra.security.TokenService;
import com.example.trabalho_frameworks.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private UsuarioRepository usuarioRepository;
    private AuthenticationManager authenticationManager;
    private TokenService tokenService;


    public LoginReponseDTO doLogin(LoginRequestDTO request) {
        var usuarioSenha = new UsernamePasswordAuthenticationToken(request.username(), request.password());
        var auth = authenticationManager.authenticate(usuarioSenha); // 401 se der ruim

        var userToken = (UserDetails) auth.getPrincipal();
        var token = tokenService.generateToken(userToken);

        Instant expirationDate = tokenService.expirationDate;
        Instant IssuedAt = tokenService.IssuedAt;

        LoginReponseDTO loginResponse = new LoginReponseDTO(
                token,
                expirationDate,
                IssuedAt
        );

        return loginResponse;
    }

    public LoginReponseDTO cadastrar(CadastroRequestDTO request) {
        if (usuarioRepository.findByEmailIgnoreCase(request.username()).isPresent()) {
            throw new ValidationException("Usuário já cadastrado.");
        }

        String senhaCriptografada = new BCryptPasswordEncoder().encode(request.password());
        UsuarioEntity usuario = new UsuarioEntity(request.username(), request.email(), senhaCriptografada);
        usuarioRepository.save(usuario);
        LoginReponseDTO loginResponse = doLogin(new LoginRequestDTO(request.username(), request.password()));

        return loginResponse;
    }
}
