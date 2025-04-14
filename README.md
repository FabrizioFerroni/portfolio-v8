# Portfolio

Una breve descripción del proyecto y los problemas que resuelve. Esta aplicación web se ha desarrollado usando Angular para ofrecer una experiencia interactiva y moderna en la web.

## Tabla de Contenidos

- [Portfolio](#portfolio)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Descripción](#descripción)
  - [Características](#características)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Instalación y Configuración](#instalación-y-configuración)
    - [Prerrequisitos](#prerrequisitos)
    - [Pasos de Instalación](#pasos-de-instalación)
  - [Uso](#uso)
  - [Scripts Disponibles](#scripts-disponibles)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Contribución](#contribución)
  - [Licencia](#licencia)
  - [Contacto](#contacto)

## Descripción

Este proyecto es mi **_portfolio web personal_**, desarrollado con Angular. En él presento información sobre mí, mis habilidades técnicas, experiencia profesional y una selección de proyectos destacados en los que he trabajado. El objetivo principal es mostrar de forma clara y atractiva mi perfil como desarrollador, facilitando el contacto y colaboración con potenciales empleadores, clientes o colegas del ámbito tecnológico.

## Características

- **Interfaz Moderna e Intuitiva:** Uso de Angular para un rendimiento óptimo y experiencia de usuario fluida.
- **Responsive Design:** Compatible con dispositivos móviles y escritorio.
- **Componentes Reutilizables:** Arquitectura modular que permite la escalabilidad y mantenimiento.
- **Integración con Servicios Web:** Conexión a APIs externas para el manejo y visualización de datos.
- **Testing y Calidad:** Implementación de pruebas unitarias y de integración.

## Tecnologías Utilizadas

- **Framework:** Angular (versión 18.2.13)
- **Lenguaje:** TypeScript, HTML5, CSS3/SASS
- **Herramientas de Build:** Angular CLI, Webpack
- **Control de Versiones:** Git, GitHub

## Instalación y Configuración

### Prerrequisitos

Antes de instalar el proyecto, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org) (versión 20 o superior)
- [Angular CLI](https://angular.io/cli)
- Git

### Pasos de Instalación

```bash
git clone https://github.com/FabrizioFerroni/portfolio-v8.git
cd portfolio-v8
npm install
```

Configura las variables de entorno (si aplica). Copia el archivo `environment.example.ts` y renómbralo como `environment.ts` dentro de la carpeta `src/environments`.

## Uso

Para iniciar el servidor de desarrollo y ver la aplicación en el navegador, ejecuta:

```bash
ng serve
```

Abre tu navegador y ve a [http://localhost:4200](http://localhost:4200) para ver la aplicación en ejecución.

## Scripts Disponibles

- `ng serve` – Compila la aplicación y levanta un servidor local con hot-reload.
- `ng build` – Genera la versión de producción del proyecto.
- `ng test` – Ejecuta las pruebas unitarias con Karma.
- `ng lint` – Verifica que el código cumpla con las reglas de estilo definidas.
- `ng e2e` – Ejecuta pruebas end-to-end.

## Estructura del Proyecto

```
portfolio-v8/
├── e2e/                    # Pruebas end-to-end
├── node_modules/           # Dependencias del proyecto
├── src/                    # Código fuente
│   ├── app/                # Componentes, servicios y módulos
│   ├── assets/             # Recursos estáticos (imágenes, estilos, etc.)
│   └── environments/       # Configuración de entornos
├── angular.json            # Configuración de Angular CLI
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

## Contribución

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b mi-nueva-característica
   ```
3. Realiza los cambios y confirma tus commits.
4. Envía una Pull Request para revisión.

> Se agradecen todas las sugerencias y mejoras que ayuden a potenciar el proyecto.

## Licencia

Distribuido bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

- **Correo:** [hola@fabriziodev.tech](mailto:hola@fabriziodev.tech)
- **GitHub:** [Fabrizio Ferroni](https://github.com/FabrizioFerroni)
