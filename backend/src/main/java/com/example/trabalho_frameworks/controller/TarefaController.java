package com.example.trabalho_frameworks.controller;

import com.example.trabalho_frameworks.dtos.HabitosReponseDTO;
import com.example.trabalho_frameworks.dtos.TarefaResponseDTO;
import com.example.trabalho_frameworks.entities.HabitoEntity;
import com.example.trabalho_frameworks.entities.TarefaEntity;
import com.example.trabalho_frameworks.entities.UsuarioEntity;
import com.example.trabalho_frameworks.repository.TarefaRepository;
import com.example.trabalho_frameworks.repository.UsuarioRepository;
import com.example.trabalho_frameworks.services.SecurityService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefa")
@AllArgsConstructor
public class TarefaController {
    private final TarefaRepository tarefaRepository;
    private final SecurityService securityService;
    private final UsuarioRepository usuarioRepository;

    @GetMapping("/all")
    public List<TarefaEntity> listarTarefas() {
        UsuarioEntity user = securityService.getUsuario();
        return user.getTarefas();
    }


    @PostMapping
    public ResponseEntity<TarefaResponseDTO> atualizarTarefa(@RequestBody TarefaEntity tarefa) {
        try {
            UsuarioEntity usuario = securityService.getUsuario();

            List<TarefaEntity> tarefas = usuario.getTarefas();
            tarefas.add(tarefa);
            usuario.setTarefas(tarefas);

            tarefa = tarefaRepository.save(tarefa);
            usuario = usuarioRepository.save(usuario);

            TarefaResponseDTO tarefaResponseDTO = new TarefaResponseDTO(
                    tarefa.getId(), tarefa.getDescricao(), tarefa.getDataInicio().toString(), tarefa.getDataLimite().toString(), tarefa.isConcluida(), usuario.getNome()
            );

            return ResponseEntity.ok(tarefaResponseDTO);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/pendentes")
    public List<TarefaEntity> listarTarefasPendentes() {
        UsuarioEntity user = securityService.getUsuario();
        user.getTarefas().forEach(tarefa -> {
            if (tarefa.isConcluida()) {
                user.getTarefas().remove(tarefa);
            }
        });

        return user.getTarefas();
    }


    @GetMapping("/concluidas")
    public List<TarefaEntity> listarTarefasConcluidas() {
        UsuarioEntity user = securityService.getUsuario();
        user.getTarefas().forEach(tarefa -> {
            if (!tarefa.isConcluida()) {
                user.getTarefas().remove(tarefa);
            }
        });

        return user.getTarefas();
    }
}
