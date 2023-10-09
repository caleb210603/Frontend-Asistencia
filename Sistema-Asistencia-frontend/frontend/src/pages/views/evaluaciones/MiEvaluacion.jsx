import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nota from '../../../components/evaluaciones/Evaluacion/Nota';
import TablaEvaluaciones from '../../../components/evaluaciones/Evaluador/TablaEvaluaciones';
import { AES, enc } from 'crypto-js';

export const MiEvaluacion = () => {

    const id = localStorage.getItem("iduser");
    const name = localStorage.getItem("name");

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const tokenKey = import.meta.env.VITE_TOKEN_KEY;

        const url = new URL(`${apiUrl}/evaluation/list`);

        const tokenD = AES.decrypt(
          localStorage.getItem("token"),
          tokenKey
        );
        const token = tokenD.toString(enc.Utf8);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.status}`);
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
          const foundUser = data.find(item => item.user && item.user.id === parseInt(id));


          if (foundUser) {
            setUser(foundUser.user);
          } else {
            console.error(`No se encontró un usuario con el ID.`);
          }
        } else {
          console.error("No se encontraron usuarios en la respuesta de la API.");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener el usuario:", error.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      {isLoading ? (
        <div className='w-full rounded-lg bg-cv-primary py-4 px-8'>
          <p className='text-gray-400'>Cargando usuario  ...</p>
        </div>
      ) : (
          <div className='w-full rounded-lg bg-cv-primary py-4 px-8'>
            <div className='flex flex-row justify-between'>
              <p className='text-gray-400'>Nombre:</p>
              <p className='text-gray-400'>Nota Final:</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p>{name}</p>
              <p>15.5</p>
            </div>
          </div>
      )}

      <TablaEvaluaciones/>
    </div>
  );
};