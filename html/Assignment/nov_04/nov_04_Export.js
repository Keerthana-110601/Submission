
export default class CodeExamples {

    basicLoopSum() {
      var i = 0;
      i = i + 300 - 200 * 4;
      let sum = 0;
      for (let j = 1; j <= 100; j++) sum += j;
      console.log(sum);
    }
  
    closureExample() {
      function f(x) { return x; }
      let vals = [];
      for (var x = 0; x < 4; x++) vals.push(() => x);
      console.log(vals.map(x => x()));
    }
  
    objectFreezeAndSeal() {
        'use strict'; 
        const obj = { par: 3 };
        obj.par = 12;
        console.log(obj);
        Object.freeze(obj);
        try {
          obj.par = 20;
        } catch (e) {
          console.error("Error:", e.message);
        }
        console.log(obj);
        
    }
  
    shorthandPropertyExample() {
      let quadeq = [];
      for (let x = 1; x <= 20; x++) {
        quadeq.push({ x, y: 2 * x * x - 5 * x + 3 });
      }
      console.log(quadeq);
    }
  
    symbolExample() {
      const x = Symbol(2);
      const y = Symbol(2);
      console.log(x == y);
      const z = x;
      console.log(x == z);
      const js_obj = {
        name: "keerthana",
        age: 60,
        [Symbol.toPrimitive](hint) {
          if (hint === "string") return "hint over 50";
          if (hint === "number") return 59;
          if (hint === "default") return "hint btw 50-70";
        }
      };
      console.log(`${js_obj}`);
      console.log("guess again", js_obj + '');
      console.log("final guess again " + (+js_obj));
    }
  
    forOfLoopExample() {
      var arr = ['a', 'b', 'c'];
      for (var i of arr) console.log(i);
    }
  
    classInheritanceExample() {
      class Jedi {
        constructor() { this.forceIsDark = false; }
        toString() { return (this.forceIsDark ? 'join' : 'fear is the path to') + ' the dark side'; }
      }
      class Sith extends Jedi {
        constructor() { super(); this.forceIsDark = true; }
      }
      let yoda = new Jedi();
      let darth = new Sith();
      console.log("Yoda:", yoda.toString());
      console.log("Darth Vader:", darth.toString());
    }
  
    
    arrayIteratorExample() {
      let it = [1, 2, 3, 4, 5][Symbol.iterator]();
      console.log(it.next());
      console.log(it.next());
      console.log(it.next());
      console.log(it.next());
      console.log(it.next());
      console.log(it.next());
    }
  
    customIteratorExample() {
      function gen(n) {
        return {
          [Symbol.iterator]() {
            let i = 0;
            return {
              next() {
                return { done: (i > n), value: i++ };
              }
            };
          }
        };
      }
      console.log([...gen(20)]);
    }
 
    forEachSumExample() {
      const ratings = [5, 4, 5];
      let sum = 0;
      const syncSum = (a, b) => a + b;
      ratings.forEach(rating => sum = syncSum(sum, rating));
      console.log(sum);
    }
  
    forEachCallbackExample() {
      const logArrayElements = (element, index) => {
        console.log(`a[${index}] = ${element}`);
      };
      [2, 3, , 4].forEach(logArrayElements);
    }
  
    arrayEntriesExample() {
      let a = [...['a', 'b', 'f'].entries()];
      console.log(a);
    }
  
    mapExample() {
      let m = new Map([...'abcd'].map(x => [x, x + x]));
      console.log(JSON.stringify([...m]));
      console.log(JSON.stringify([...m.keys()]));
      console.log(JSON.stringify([...m.values()]));
      console.log(JSON.stringify([...m.entries()]));
    }
  
    generatorFlattenExample() {
      function* flatten(arr) {
        for (let x of arr) {
          if (x instanceof Array) yield* flatten(x);
          else yield x;
        }
      }
      let t = flatten([1, 2, [3, 4]]);
      console.log([...t]);
    }
  
    objectDestructuringExample() {
      let a = { x: 1, y: 2 };
      let { x: b, y: z } = a;
      console.log(b);
      console.log(z);
    }
  
    arrayDestructuringExample() {
      let [a, b = 3, c = 5] = [1, undefined];
      console.log(a);
      console.log(b);
    }
  
    recursiveReverseExample() {
      let reverse = ([x, ...y]) =>
        (y.length > 0) ? [...reverse(y), x] : [x];
      console.log(reverse("anahtreek"));
      console.log(reverse([1, 2, 3, 4, 5]));
    }
  
    generatorSquaresExample() {
      function* squares(n) {
        for (let i = 1; i < n; i += 1) yield Math.pow(i, 2);
      }
      console.log([...squares(13)]);
    }
  }
  
  