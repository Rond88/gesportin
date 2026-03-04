package net.ausiasmarch.gesportin.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import net.ausiasmarch.gesportin.entity.ClubEntity;
import net.ausiasmarch.gesportin.exception.ResourceNotFoundException;
import net.ausiasmarch.gesportin.repository.ClubRepository;

@Service
public class ClubService {

    @Autowired
    private ClubRepository oClubRepository;

    private final Random random = new Random();

    private final String[] descripciones1 = {
            "Atlético", "Deportivo", "Real club", "Unión deportiva",
            "Sociedad deportiva", "Socidad nacional", "Agrupación deportiva", "Club deportivo",
            "Asociación deportiva", "Federación deportiva", "Equipo deportivo", "Comunidad deportiva",
            "Círculo deportivo" };
    private final String[] descripciones2 = {
            "Fúbol", "Baloncesto", "Voleibol", "Hockey",
            "Rugby", "Tenis", "Natación", "Atletismo",
            "Ciclismo", "Boxeo", "Esgrima", "Gimnastia",
            "Piragüismo", "Remo", "Judo", "Taekwondo",
            "Karate", "Golf", "Surf", "Esquí" };
    private final String[] descripciones3 = {
            "Barcelona", "Madrid", "Valencia", "Sevilla",
            "Zaragoza", "Villarreal", "Granada", "Cádiz",
            "Bilbao", "San Sebastián", "Vigo", "La Coruña",
            "Mallorca", "Ibiza", "Tenerife", "Las Palmas" };
    private final String[] direcciones1 = {
            "Calle", "Avenida", "Plaza", "Camino", "Paseo", "Ronda", "Glorieta", "Travesía" };

    private final String[] nombres = { "Juan", "Carlos", "Luis", "Miguel", "Javier", "David", "Ángel", "Sergio",
            "Pablo", "Diego",
            "Manuel", "Francisco", "José", "Antonio", "Jesús", "Alberto", "Fernando", "Raúl", "Rubén", "Óscar" };

    private final String[] apellidos = { "García", "Martínez", "López", "Sánchez", "Pérez", "González", "Rodríguez",
            "Fernández",
            "Jiménez", "Moreno", "Muñoz", "Alonso", "Gutiérrez", "Romero", "Díaz", "Torres", "Ruiz", "Hernández",
            "Vázquez", "Castro" };

    public ClubEntity get(Long id) {
        return oClubRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Club no encontrado con id: " + id));
    }

    public Page<ClubEntity> getPage(Pageable pageable) {
        return oClubRepository.findAll(pageable);
    }

    public ClubEntity create(ClubEntity oClubEntity) {
        oClubEntity.setId(null);
        oClubEntity.setFechaAlta(LocalDateTime.now());
        return oClubRepository.save(oClubEntity);
    }

    public ClubEntity update(ClubEntity oClubEntity) {
        ClubEntity oClubExistente = oClubRepository.findById(oClubEntity.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Club no encontrado con id: " + oClubEntity.getId()));

        oClubExistente.setNombre(oClubEntity.getNombre());
        oClubExistente.setDireccion(oClubEntity.getDireccion());
        oClubExistente.setTelefono(oClubEntity.getTelefono());
        oClubExistente.setFechaAlta(oClubEntity.getFechaAlta());
        return oClubRepository.save(oClubExistente);
    }

    public Long delete(Long id) {
        ClubEntity oClub = oClubRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Club no encontrado con id: " + id));
        oClubRepository.delete(oClub);
        return id;
    }

    public Long count() {
        return oClubRepository.count();
    }

    public Long empty() {
        oClubRepository.deleteAll();
        oClubRepository.flush();
        return 0L;
    }

    public Long fill(Long cantidad) {
        for (int i = 0; i < cantidad; i++) {
            ClubEntity oClub = new ClubEntity();
            String nombre = descripciones1[random.nextInt(descripciones1.length)] + " de " +
                    descripciones2[random.nextInt(descripciones2.length)] + " en " +
                    descripciones3[random.nextInt(descripciones3.length)];
            oClub.setNombre(nombre);
            String direccion = direcciones1[random.nextInt(direcciones1.length)] + " de "
                    + nombres[random.nextInt(nombres.length)] + " " +
                    apellidos[random.nextInt(apellidos.length)] + ", " + (random.nextInt(100) + 1);
            oClub.setDireccion(direccion);
            oClub.setTelefono("6" + (random.nextInt(900000) + 1000000));
            oClub.setFechaAlta(LocalDateTime.now());
            // oClub.setImagen(("imagen" + i).getBytes());
            // Coordenadas aleatorias dentro de España (lat 36-43, lng -9 a 3)
            oClub.setLatitud(36.0 + random.nextDouble() * 7.0);
            oClub.setLongitud(-9.0 + random.nextDouble() * 12.0);
            oClubRepository.save(oClub);
        }
        return cantidad;
    }

    public ClubEntity getOneRandom() {
        Long count = oClubRepository.count();
        if (count == 0) {
            return null;
        }
        int index = random.nextInt(count.intValue());
        return oClubRepository.findAll(Pageable.ofSize(1).withPage(index)).getContent().get(0);
    }
}
