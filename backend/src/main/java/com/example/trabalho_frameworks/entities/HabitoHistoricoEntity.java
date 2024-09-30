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

    @ManyToOne
    @JoinColumn(name = "id_habito")
    private HabitoEntity habito;

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

    public HabitoEntity getHabito() {
        return habito;
    }

    public void setHabito(HabitoEntity habito) {
        this.habito = habito;
    }
}
