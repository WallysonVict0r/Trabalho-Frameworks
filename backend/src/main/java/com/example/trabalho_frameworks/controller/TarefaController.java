package com.example.trabalho_frameworks.controller;

import com.example.trabalho_frameworks.entities.TarefaEntity;
import com.example.trabalho_frameworks.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefa")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    @GetMapping("/all")
    public List<TarefaEntity> listarTarefas() {
        return tarefaRepository.findAll();
    }

    @PostMapping("/add")
    public TarefaEntity adicionarTarefa(@RequestBody TarefaEntity tarefa) {
        return tarefaRepository.save(tarefa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarefaEntity> atualizarTarefa(@PathVariable Long id, @RequestBody TarefaEntity tarefaAtualizada) {
        return tarefaRepository.findById(id)
                .map(tarefa -> {
                    tarefa.setDescricao(tarefaAtualizada.getDescricao());
                    tarefa.setDataInicio(tarefaAtualizada.getDataInicio());
                    tarefa.setDataLimite(tarefaAtualizada.getDataLimite());
                    tarefa.setConcluida(tarefaAtualizada.isConcluida());
                    TarefaEntity atualizada = tarefaRepository.save(tarefa);
                    return ResponseEntity.ok(atualizada);
                }).orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/pendentes")
    public List<TarefaEntity> listarTarefasPendentes() {
        return tarefaRepository.findByIsConcluidaFalse();
    }


    @GetMapping("/concluidas")
    public List<TarefaEntity> listarTarefasConcluidas() {
        return tarefaRepository.findByIsConcluidaTrue();
    }
}
