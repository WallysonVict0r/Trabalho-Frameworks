package com.example.trabalho_frameworks.repository;

import com.example.trabalho_frameworks.entities.TarefaEntity;
import com.example.trabalho_frameworks.entities.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, UUID> {
    Optional<UserDetails> findByEmailIgnoreCase(String email);
    Optional<UsuarioEntity> findByEmail(String email);

}
