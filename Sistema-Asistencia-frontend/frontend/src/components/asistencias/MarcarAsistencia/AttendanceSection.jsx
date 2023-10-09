import PropTypes from "prop-types";
import { RelojAnalogico } from "./RelojAnalogico";
import Loading from "../../essentials/Loading";

export const AttendanceSection = ({
  horaActual,
  mostrarBotonEntrada,
  mostrarBotonSalida,
  entradaMarcada,
  salidaMarcada,
  tardanzaMañana,
  tardanzaTarde,
  buttonClicked,
  buttonClickedAdmission,
  handleButtonClick,
  handleButtonClickAdmission,
  cargando,
}) => {
  return (
    <div className="seccion-derecha bg-cv-primary flex flex-col items-center justify-start m-4 rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-cv-cyan">
      <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 max-[600px]:hidden">
        <RelojAnalogico hora={horaActual} />
      </div>
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
        {horaActual.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </p>
      <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16">
        {mostrarBotonEntrada &&
          (cargando ? (
            <div className="w-full h-20">
              <Loading></Loading>
            </div>
          ) : (
            <button
              className="bg-cv-cyan hover:bg-cv-secondary text-cv-primary hover:text-cv-cyan font-bold py-2 px-4 rounded mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
              onClick={handleButtonClickAdmission}
              disabled={buttonClickedAdmission}
            >
              Marcar entrada
            </button>
          ))}
        {entradaMarcada && (
          <p className="text-green-500 font-bold mt-4">Entrada marcada</p>
        )}
        {mostrarBotonSalida &&
          (cargando ? (
            <div className="w-full h-20">
              <Loading></Loading>
            </div>
          ) : (
            <button
              className="bg-cv-cyan hover:bg-cv-primary text-cv-primary hover:text-cv-cyan font-bold py-2 px-4 rounded mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
              onClick={handleButtonClick}
              disabled={buttonClicked}
            >
              Marcar salida
            </button>
          ))}
        {buttonClicked && (
          <p className="text-blue-500 font-semibold mt-4">
            ¡Ya has marcado asistencia!
          </p>
        )}
        {salidaMarcada && (
          <p className="text-green-500 font-bold mt-4">Salida marcada</p>
        )}
        {tardanzaMañana && (
          <p className="text-red-500 font-bold mt-4">
            Tardanza (marcado después de las 8:10)
          </p>
        )}
        {tardanzaTarde && (
          <p className="text-red-500 font-bold mt-4">
            Tardanza (marcado después de las 14:10)
          </p>
        )}
      </div>
    </div>
  );
};

AttendanceSection.propTypes = {
  // 
  cargando: PropTypes.bool.isRequired,
  horaActual: PropTypes.instanceOf(Date).isRequired,
  mostrarBotonEntrada: PropTypes.bool.isRequired,
  mostrarBotonSalida: PropTypes.bool.isRequired,
  entradaMarcada: PropTypes.bool.isRequired,
  salidaMarcada: PropTypes.bool.isRequired,
  tardanzaMañana: PropTypes.bool.isRequired,
  tardanzaTarde: PropTypes.bool.isRequired,
  buttonClicked: PropTypes.bool.isRequired,
  buttonClickedAdmission: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleButtonClickAdmission: PropTypes.func.isRequired,
};
