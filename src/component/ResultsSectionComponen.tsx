// ResultsSectionComponent.tsx
import React from 'react';

const ResultsSectionComponent: React.FC = () => {
    return (
        <div className="card" id="resultados" style={{ display: 'none' }}>
            <div className="card-header">
                <h4 className="float-left heading h4-responsive mb-0">Información de Contacto</h4>
            </div>
            <div className="card-body">
                <form className="needs-validation formulario-2" id="id_formulario2" autoComplete="off">
                    {/* Form inputs and elements */}
                    {/* ... */}
                </form>
            </div>
        </div>
    );
};

export default ResultsSectionComponent;
