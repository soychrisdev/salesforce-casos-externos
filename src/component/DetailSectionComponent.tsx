import React from 'react';

const DetailSectionComponent: React.FC = () => {
    return (
        <div className="card col-12 col-md-8 mx-md-auto" id="detalle" style={{ display: 'none' }}>
            {/* Card Header */}
            <div className="card-header d-flex align-items-center justify-content-between pb-0">
                <h4 className="heading h4-responsive mb-0">
                    <span>Recepción Exitosa</span>
                </h4>
            </div>
            {/* Card Body */}
            <div className="card-body">
                <p>Estimado Nombre Primer Apellido:</p>
                <p>
                    Para conocer las distintas carreras que imparte nuestra institución, lo invitamos a visitar nuestro sitio
                    web donde podrá encontrar el detalle de estas. (<a href="http://portales.inacap.cl/carreras/index">http://portales.inacap.cl/carreras/index</a>)
                </p>
                <p>
                    En caso de requerir mayor información, puede contactar al Encargado de Egresados y Empleabilidad de la sede
                    de su interés. Podrá revisar los contactos <a href="#">Aquí</a>.
                </p>
                <p>Saludos cordiales.</p>
                <p>Equipo INACAP.</p>
            </div>
            {/* Card Footer */}
            <div className="text-center">
                <button onClick={() => (window.location.href = 'index.html')} className="btn btn-secondary">
                    <span>Cerrar</span>
                </button>
            </div>
            <div className="d-flex"></div>
        </div>
    );
};

export default DetailSectionComponent;
