package cz.hruby.blindmapbackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class BlindMap {

    @Id
    private long id;

    @Column(length = 100)
    private String name;
}
