package com.example.trabalho_frameworks.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "habito")
public class HabitoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "id_usuario")
    private Long usuario;

    @OneToMany(mappedBy = "habito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HabitoHistoricoEntity> habitoHistorico;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getUsuario() {
        return usuario;
    }

    public void setUsuario(Long usuario) {
        this.usuario = usuario;
    }

    public List<HabitoHistoricoEntity> getHabitoHistorico() {
        return habitoHistorico;
    }

    public void setHabitoHistorico(List<HabitoHistoricoEntity> habitoHistorico) {
        this.habitoHistorico = habitoHistorico;
    }
}
