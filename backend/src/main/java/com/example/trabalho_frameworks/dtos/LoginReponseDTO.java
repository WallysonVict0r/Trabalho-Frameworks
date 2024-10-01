package com.example.trabalho_frameworks.dtos;

import java.time.Instant;

public record LoginReponseDTO (String token, Instant createdAt, Instant expiresIn) {
}
