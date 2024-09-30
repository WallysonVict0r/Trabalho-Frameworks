package com.example.trabalho_frameworks.repository;

import com.example.trabalho_frameworks.entities.HabitoHistoricoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitoHistoricoRepository extends JpaRepository<HabitoHistoricoEntity, Long> {}
