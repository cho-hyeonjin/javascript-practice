function first() {
  console.log('First');
}

function second() {
  setTimeout(() => {
    console.log('Second');
  }, 0);
}

function third() {
  Promise.resolve(1).then(() => {
    console.log('Third');
  });
}

function fourth() {
  console.log('Fourth');
}

first();

second();

third();

fourth();
