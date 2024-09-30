package com.example.trabalho_frameworks.controller;

import com.example.trabalho_frameworks.entities.HabitoEntity;
import com.example.trabalho_frameworks.repository.HabitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/habitos")
public class HabitoController {

    @Autowired
    private HabitoRepository habitoRepository;

    @GetMapping("/all")
    public List<HabitoEntity> listarHabitos() {
        return habitoRepository.findAll();
    }

    @PostMapping("/add")
    public HabitoEntity adicionarHabito(@RequestBody HabitoEntity habito) {
        return habitoRepository.save(habito);
    }
}
