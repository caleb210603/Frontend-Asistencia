import { useState } from "react";
import ModalConfirmacion from "./Modals/ModalConfirmacion";
const TablaEvaluaciones = () => {
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [numFilas, setNumFilas] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);
    const fechaActual = new Date();

    const obtenerNombreDelMes = (fecha) => {
        const meses = [
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
            "AGOSTO",
            "SEPTIEMBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE",
        ];
        return meses[fecha.getMonth()];
    };

    const mesActual = obtenerNombreDelMes(fechaActual);

    const agregarFila = () => {
        setMostrarModal(true); // Mostrar el modal al agregar una fila
    };

    const confirmarAgregarFila = () => {
        setNumFilas(numFilas + 1);
        setMostrarModal(false); // Ocultar el modal después de confirmar
    };

    const cancelarAgregarFila = () => {
        setMostrarModal(false); // Ocultar el modal al cancelar
    };

    const renderTabla = () => {
        if (mostrarTabla) {
            return (
                <div>
                    {/* Renderiza el nuevo componente ModalConfirmacion */}
                    <ModalConfirmacion
                        isOpen={mostrarModal}
                        onConfirm={confirmarAgregarFila}
                        onClose={cancelarAgregarFila}
                    />
                    <table className="w-full text-sm text-center text-white">
                        <thead>
                            <tr>
                                <th colSpan="6" className="px-6 py-4 whitespace-nowrap text-base uppercase">EVALUACIONES</th>
                            </tr>
                        </thead>
                        <tbody className="bg-cv-primary">
                            <tr className="border-b border-cv-secondary">
                                <td className="px-6 py-4 whitespace-nowrap">MES</td>
                                <td className="px-6 py-4 whitespace-nowrap">HABILIDAD 1</td>
                                <td className="px-6 py-4 whitespace-nowrap">HABILIDAD 2</td>
                                <td className="px-6 py-4 whitespace-nowrap">HABILIDAD 3</td>
                                <td className="px-6 py-4 whitespace-nowrap">HABILIDAD 4</td>
                                <td className="px-6 py-4 whitespace-nowrap">PROMEDIO</td>
                            </tr>
                            <tr className="border-b border-cv-secondary">
                                <td className="px-6 py-4 whitespace-nowrap">{`${mesActual}`}</td>
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                            </tr>
                            {renderFilasDeHabilidades()}
                            <tr className="border-b border-cv-secondary">
                                <td colSpan="6" className="px-6 py-4 whitespace-nowrap">
                                    {/* Cambia el botón para mostrar el modal desde la primera vez */}
                                    <button className="uppercase" onClick={agregarFila}>Agregar Evaluación +</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <table className="w-full text-sm text-center text-white">
                    <thead>
                        <tr>
                            <th colSpan="6" className="px-6 py-4 whitespace-nowrap text-base uppercase">EVALUACIONES</th>
                        </tr>
                    </thead>
                    <tbody className="bg-cv-primary">
                        <tr>
                            <td colSpan="6" className="px-6 py-4 whitespace-nowrap">
                                {/* Cambia el botón para mostrar el modal desde la primera vez */}
                                <button className="uppercase" onClick={() => {
                                    setMostrarTabla(true);
                                    agregarFila(); // Muestra el modal al hacer clic en el botón por primera vez
                                }}>
                                    Agregar Evaluación +
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    };

    const renderFilasDeHabilidades = () => {
        const filas = [];
        for (let i = 0; i < numFilas; i++) {
            filas.push(
                <tr key={i} className="border-b border-cv-secondary">
                    <td className="px-6 py-4 whitespace-nowrap">{`${mesActual}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                </tr>
            );
        }
        return filas;
    };

    return (
        <div className="w-full bg-[#0e161b] shadow-md rounded-t overflow-hidden overflow-x-auto scrollbar">
            {renderTabla()}
        </div>
    );
};

export default TablaEvaluaciones;
