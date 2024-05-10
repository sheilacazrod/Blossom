package com.blossom.blossom_api;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
@Configuration
public class WebMvcConfigurer {
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica CORS a todas las rutas
                .allowedOrigins("http://localhost:4200") // Permite solicitudes desde http://localhost:4200/
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Permite métodos HTTP específicos
                .allowedHeaders(""); // Permite todos los encabezados
    }
}
