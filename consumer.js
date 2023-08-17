const amqp = require('amqplib');

const init = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'dicoding';
    const message = 'HAVE FUN! Selamat belajar dicoding';

    await channel.assertQueue(queue, {
        durable: true,
    });

    await channel.consume(queue, (message)=> {
        console.log(`Menerima pesan dari ${queue}: ${message.content.toString()}`);
    }, { noAck: true });
}

init();