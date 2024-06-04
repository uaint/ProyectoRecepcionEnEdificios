import logging

def setup_logging(log_file='app.log'):
    log_format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    
    logging.basicConfig(level=logging.DEBUG,
                        format=log_format,
                        handlers=[
                            logging.FileHandler(log_file),
                            logging.StreamHandler()
                        ])

    app_logger = logging.getLogger('app_logger')  # Crear un logger para la aplicación
    return app_logger


logger = setup_logging() # Crear una instancia del logger

def debug_function():
    logger.debug("Debugging message.")

def info_function():
    logger.info("Informative message.")

def error_function():
    try:
        # Exception case
        raise ValueError("Example error.")
    except ValueError as e:
        logger.error(f"There's been an error: {e}")

# Utilización de la configuración
if __name__ == "__main__":
    debug_function()
    info_function()
    error_function()
