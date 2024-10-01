package com.example.trabalho_frameworks.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name = "historico_habito")
public class HabitoHistoricoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "id_habito") // Coluna de junção que faz referência ao id de HabitoEntity
    private Long habito;

    @Column(name = "id_usuario") // Coluna de junção que faz referência ao id de UsuarioEntity
    private Long usuario;


    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Long getHabito() {
        return habito;
    }

    public void setHabito(Long habito) {
        this.habito = habito;
    }

    public Long getIdUsuario() {
        return usuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.usuario = idUsuario;
    }
}
