package com.example.trabalho_frameworks.controller;

import com.example.trabalho_frameworks.dtos.HabitoRequestDTO;
import com.example.trabalho_frameworks.dtos.HabitosReponseDTO;
import com.example.trabalho_frameworks.entities.HabitoEntity;
import com.example.trabalho_frameworks.entities.UsuarioEntity;
import com.example.trabalho_frameworks.repository.HabitoRepository;
import com.example.trabalho_frameworks.repository.UsuarioRepository;
import com.example.trabalho_frameworks.services.SecurityService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/habitos")
@AllArgsConstructor
public class HabitoController {
    private final HabitoRepository habitoRepository;
    private final SecurityService securityService;
    private final UsuarioRepository usuarioRepository;

    @GetMapping("/all")
    public List<HabitoEntity> listarHabitos() {
        UsuarioEntity user = securityService.getUsuario();
        return user.getHabitos();
    }

    @PostMapping("/add")
    public ResponseEntity<HabitosReponseDTO> adicionarHabito(@RequestBody HabitoRequestDTO habito) {
        try {
            HabitoEntity habitoEntity = new HabitoEntity();
            habitoEntity.setDescricao(habito.descricao());
            habitoEntity = habitoRepository.save(habitoEntity);

            UsuarioEntity usuario = securityService.getUsuario();
            List<HabitoEntity> habitos = usuario.getHabitos();
            habitos.add(habitoEntity);

            usuario.setHabitos(habitos);
            usuarioRepository.save(usuario);

            HabitosReponseDTO habitoResponseDTO = new HabitosReponseDTO(
                    habitoEntity.getId(), habitoEntity.getDescricao(), usuario.getNome()
            );

            return ResponseEntity.ok(habitoResponseDTO);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
