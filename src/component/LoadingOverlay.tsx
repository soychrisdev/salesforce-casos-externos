import React from "react";

const LoadingOverlayComponent: React.FC = () => {
	return (
		<div
			className="loading-backdrop"
			id="loadingOverlay"
			style={{ display: "block" }}
		>
			<div className="loading-circle">
				<div className="preloader-wrapper big active">
					<div className="spinner-layer spinner-white-only">
						<div className="circle-clipper left">
							<div className="circle" />
						</div>
						<div className="gap-patch">
							<div className="circle" />
						</div>
						<div className="circle-clipper right">
							<div className="circle" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingOverlayComponent;
