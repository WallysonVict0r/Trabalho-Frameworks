package com.example.trabalho_frameworks.dtos;

import java.time.LocalDateTime;

public record TarefaRequestDTO(String descricao, LocalDateTime dataInicio, LocalDateTime dataLimite, boolean isConcluida) {
}
