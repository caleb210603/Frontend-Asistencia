import { AES, enc } from "crypto-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcumb, ProfileAvatar, ProfileGrafic, ProfileItem, ProfileTitle } from "../../components/colaboradores";
import Loading from "../../components/essentials/Loading";

export const PerfilColaborador = () => {
	const { id } = useParams();
	const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_TOKEN_KEY)
	const token = tokenD.toString(enc.Utf8)
	const [user, setUser] = useState(null);

	useEffect(() => {
		const Profile = () => {
			fetch(import.meta.env.VITE_API_URL + '/users/' + id, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
				.then(response => response.json())
				.then(data => {
					setUser(data);
				})
				.catch(error => {
					console.error('Error al obtener datos:', error);
				});
		}
		Profile();
	}, [id, token])

	if (user === null) {
		// Puedes mostrar un mensaje de carga o cualquier otro contenido adecuado.
		return <Loading></Loading>;
	}

	return (
		<>
			<Breadcumb />
			{user && (

				<div className="grid grid-cols-1 md:grid-cols-5 grid-rows-8 gap-4 text-white">
					<div className="col-span-1 md:col-span-3 row-span-5 bg-cv-primary rounded-2xl p-5 order-2 md:order-1">
						<ProfileTitle>Datos Personales</ProfileTitle>
						<div className='space-y-5'>
							<ProfileItem
								label="Nombres completos"
								value={`${user.usuario.name} ${user.usuario.surname}`}
							/>
							<div className='w-full flex items-center justify-center gap-5'>
								<ProfileItem
									label="DNI"
									value={user.usuario.dni}
								/>
								<ProfileItem
									label="Fecha de nacimiento"
									value={user.usuario.birthday}
								/>
								<ProfileItem
									label="Teléfono"
									value={user.usuario.cellphone}
								/>
							</div>
							<ProfileItem
								label="Correo electrónico"
								value={user.usuario.email}
							/>
						</div>
					</div>
					<div className="col-span-1 md:col-span-2 row-span-5 md:col-start-4 bg-cv-primary rounded-2xl p-5 order-1 md:order-2">
						<ProfileAvatar
							image={user.usuario.image_url}
						/>
					</div>
					<div className="col-span-1 md:col-span-3 row-span-3 md:row-start-6  bg-cv-primary rounded-2xl p-5 order-3 md:order-3">
						<ProfileTitle>Datos de la empresa</ProfileTitle>
						<div className='space-y-5'>

							<div className='w-full flex items-center justify-center gap-5'>
								<ProfileItem
									label="Departamento"
									value={user.usuario.position[0].core.department.name}
								/>
								<ProfileItem
									label="Núcleo"
									value={user.usuario.position[0].core.name}
								/>
							</div>
							<div className='w-full flex items-center justify-center gap-5'>

								<ProfileItem
									label="Perfil"
									value={user.usuario.position[0].name}
								/>
								<ProfileItem
									label="Rol"
									value={user.usuario.roles[0].name}
								/>

							</div>
							<div className='w-full flex items-center justify-center md:gap-5'>
								<ProfileItem
									label="Fecha de ingreso"
									value={user.usuario.date_start}
								/>
								<ProfileItem
									label="Fecha de salida"
									value={user.usuario.date_end}
								/>

							</div>
							<div className='w-full flex items-center justify-center gap-5'>
								<ProfileItem
									label="Turno"
									value={user.usuario.shift}
								/>
								<ProfileItem
									label="Estado"
									value={`${user.usuario.status === 1 ? 'Activo' : 'Inactivo'} ${user.usuario.status !== 1 ? user.usuario.status_description : ''}`}
								/>
							</div>
						</div>
					</div>
					<div className="col-span-1 md:col-span-2 row-span-3 md:col-start-4 md:row-start-6 bg-cv-primary rounded-2xl text-white p-5 order-4 md:order-4">
						<ProfileTitle>Datos de Asistencia</ProfileTitle>
						<ProfileGrafic
							asistencia={user.Asistencia}
							tardanza={user.Tardanzas}
							justificacion={user.Justificaciones}
							falta={user.Faltas}
						/>
					</div>
				</div>
			)}
		</>
	)
}
