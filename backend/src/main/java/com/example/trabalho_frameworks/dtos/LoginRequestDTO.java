package com.example.trabalho_frameworks.dtos;

import java.io.Serializable;

public record LoginRequestDTO(String username, String password
) implements Serializable { }