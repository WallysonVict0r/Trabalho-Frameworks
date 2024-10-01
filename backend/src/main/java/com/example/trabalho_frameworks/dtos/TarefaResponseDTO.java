package com.example.trabalho_frameworks.dtos;

public record TarefaResponseDTO(Long id, String descricao, String dataInicio, String dataLimite, boolean isConcluida, String username) {
}
