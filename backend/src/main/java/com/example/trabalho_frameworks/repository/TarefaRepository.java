package com.example.trabalho_frameworks.repository;

import com.example.trabalho_frameworks.entities.TarefaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarefaRepository extends JpaRepository<TarefaEntity, Long> {

    List<TarefaEntity> findByIsConcluidaFalse();

    // Método para buscar tarefas concluídas
    List<TarefaEntity> findByIsConcluidaTrue();
}
