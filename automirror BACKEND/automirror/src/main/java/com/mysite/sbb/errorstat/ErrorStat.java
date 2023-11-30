package com.mysite.sbb.errorstat;

import com.mysite.sbb.appuser.AppUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ErrorStat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long errorStatIndex;

    @Column(nullable = false)
    private long todoCount;

    @Column(nullable = false)
    private long weatherCount;

    @Column(nullable = false)
    private long busCount;

    @Column(nullable = false)
    private long newsCount;

    @OneToOne
    private AppUser appUser;
}
