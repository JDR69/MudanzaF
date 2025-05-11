import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function ComentariosPage() {
    const comentarios = [
        {
            nombre: "kante",
            comentario: "¡Excelente servicio! Los productos llegaron a tiempo y en perfecto estado.",
            imagen: "https://res.cloudinary.com/ddltlpsy1/image/upload/v1746906333/rojo_hw5hkp.jpg"
        },
      
    ];

    return (
        <div className='contenedoresPrincipales' id='conteinerWidth'>
            <h1>Comentarios</h1>
            <div className='contenedorHijo'>
                <div className='contenedorHijoFila'>
                    {comentarios.map((item, index) => (
                        <Card key={index} sx={{ maxWidth: 345, marginBottom: 2 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={item.imagen}
                                    alt={`Foto de ${item.nombre}`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {item.nombre}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {item.comentario}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ComentariosPage;
