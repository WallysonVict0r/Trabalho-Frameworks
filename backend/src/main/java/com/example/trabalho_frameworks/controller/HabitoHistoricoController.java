package com.example.trabalho_frameworks.controller;

import com.example.trabalho_frameworks.entities.HabitoHistoricoEntity;
import com.example.trabalho_frameworks.repository.HabitoHistoricoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/habito-historico")
public class HabitoHistoricoController {

    @Autowired
    private HabitoHistoricoRepository habitoHistoricoRepository;

    @GetMapping("/all")
    public List<HabitoHistoricoEntity> listarHabitoHistorico() {
        return habitoHistoricoRepository.findAll();
    }

    @PostMapping("/add")
    public HabitoHistoricoEntity adicionarHabitoHistorico(@RequestBody HabitoHistoricoEntity habitoHistorico) {
        return habitoHistoricoRepository.save(habitoHistorico);
    }

    @GetMapping("/{id}")
    public HabitoHistoricoEntity obterHabitoHistoricoPorId(@PathVariable Long id) {
        return habitoHistoricoRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void removerHabitoHistorico(@PathVariable Long id) {
        habitoHistoricoRepository.deleteById(id);
    }
}
