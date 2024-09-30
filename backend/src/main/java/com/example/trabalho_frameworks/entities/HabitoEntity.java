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

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private UsuarioEntity usuario;

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

    public UsuarioEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioEntity usuario) {
        this.usuario = usuario;
    }

    public List<HabitoHistoricoEntity> getHabitoHistorico() {
        return habitoHistorico;
    }

    public void setHabitoHistorico(List<HabitoHistoricoEntity> habitoHistorico) {
        this.habitoHistorico = habitoHistorico;
    }
}
