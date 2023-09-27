import React from 'react';

const FooterComponent: React.FC = () => {
    return (
        <footer className="page-footer">
            <div className="container py-3">
                <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                    <div className="logo-gst"><img src="http://www.inacap.cl/web/template-aplicaciones/img/logo-gst.png" alt="" /></div>
                    <span className="pl-2 pl-md-4">Gerencia de Sistemas y Tecnolog&iacute;as</span>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
