// hooks/useSonido.js

const useSonido = () => {
  // Manejar sonido
  let audioInstance = null;
  const sonidoSolicitarServicio = () => {
    if (audioInstance) {
      audioInstance.currentTime = 0; // Reinicia si ya se está reproduciendo
    } else {
      audioInstance = new Audio("/sonidos/add-cart.mp3");
    }

    audioInstance.play().catch((error) => {
      console.warn("No se pudo reproducir el sonido:", error);
    });
  };

  const sonidoRemoverServicio = () => {
    if (audioInstance) {
      audioInstance.currentTime = 0; // Reinicia si ya se está reproduciendo
    } else {
      audioInstance = new Audio("/sonidos/remove-cart.mp3");
    }

    audioInstance.play().catch((error) => {
      console.warn("No se pudo reproducir el sonido:", error);
    });
  };

  return {
    sonidoSolicitarServicio,
    sonidoRemoverServicio,
  };
};

export default useSonido;
