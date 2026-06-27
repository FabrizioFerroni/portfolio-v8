import { ZardBadgeComponent } from '@/shared/components/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/fabriziodev';
import { Component } from '@angular/core';

@Component({
  selector: 'app-experiencias',
  imports: [Card, CardHeader, CardTitle, CardContent, ZardBadgeComponent],
  templateUrl: './component.html',
  styleUrl: './component.css',
})
export class Experiencias {
  experiences = [
    {
      id: 1,
      role: 'Senior Fullstack Developer',
      company: 'Empresa XYZ',
      period: '2021 - Presente',
      description:
        'Desarrollo de aplicaciones web utilizando React, Node.js y MongoDB. Liderazgo de equipo y mentorización de desarrolladores junior.',
      achievements: [
        'Rediseño completo de la plataforma principal, mejorando el rendimiento en un 40%',
        'Implementación de CI/CD que redujo el tiempo de despliegue en un 60%',
        'Desarrollo de una arquitectura escalable que soporta más de 100k usuarios activos',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    },
    {
      id: 2,
      role: 'Frontend Developer',
      company: 'Startup ABC',
      period: '2019 - 2021',
      description:
        'Desarrollo de interfaces de usuario para aplicaciones web y móviles utilizando React y React Native.',
      achievements: [
        'Desarrollo de componentes reutilizables que aceleraron el desarrollo en un 30%',
        'Optimización del rendimiento de la aplicación, reduciendo el tiempo de carga en un 50%',
        'Implementación de pruebas automatizadas, aumentando la cobertura de código al 80%',
      ],
      technologies: ['React', 'React Native', 'Redux', 'Jest', 'Styled Components'],
    },
    {
      id: 3,
      role: 'Backend Developer',
      company: 'Corporación DEF',
      period: '2017 - 2019',
      description:
        'Desarrollo de APIs y servicios backend utilizando Node.js, Express y PostgreSQL.',
      achievements: [
        'Diseño e implementación de una API RESTful para el sistema principal de la empresa',
        'Migración de una base de datos monolítica a una arquitectura de microservicios',
        'Implementación de autenticación y autorización basada en JWT',
      ],
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    },
  ];
}
