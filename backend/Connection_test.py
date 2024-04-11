import mysql.connector

# Configuración de la conexión
config = {
    'user': 'rgAzAdmin',
    'password': 'password',
    'host': 'rg-mysql-azure.mysql.database.azure.com',
    'database': 'roentgenium',
    'port': 3306
}

# Establecer conexión con la base de datos
try:
    connection = mysql.connector.connect(**config)
    print('Conexión exitosa a la base de datos de Azure MySQL')

    # Ejemplo de consulta
    try:
        cursor = connection.cursor()

        # Ejemplo de consulta SELECT
        cursor.execute('SELECT * FROM inhabitants')
        rows = cursor.fetchall()
        
        for row in rows:
            print(row)

        cursor.close()
    except mysql.connector.Error as err:
        print(f'Error al ejecutar la consulta: {err}')

    # Cerrar conexión
    connection.close()

except mysql.connector.Error as err:
    print(f'Error al conectar a la base de datos: {err}')
