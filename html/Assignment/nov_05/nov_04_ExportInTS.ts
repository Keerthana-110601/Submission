export default class CodeExamples {
    basicLoopSum(): void {
      try {
        let i = 0;
        i = i + 300 - 200 * 4;
        let sum = 0;
        for (let j = 1; j <= 100; j++) sum += j;
        console.log(sum);
      } catch (e: any) {
        console.error("Error in basicLoopSum:", e.message);
      }
    }
  
    closureExample(): void {
      try {
        const vals: (() => number)[] = [];
        for (let x = 0; x < 4; x++) vals.push(() => x);
        console.log(vals.map(fn => fn()));
      } catch (e: any) {
        console.error("Error in closureExample:", e.message);
      }
    }
  
    objectFreezeAndSeal(): void {
      try {
        'use strict';
        const obj: { par: number } = { par: 3 };
        obj.par = 12;
        console.log(obj);
        Object.freeze(obj);
        try {
          obj.par = 20; // will throw in strict mode
        } catch (e: any) {
          console.error("Freeze Error:", e.message);
        }
        console.log(obj);
      } catch (e: any) {
        console.error("Error in objectFreezeAndSeal:", e.message);
      }
    }
  
    shorthandPropertyExample(): void {
      try {
        const quadeq: { x: number; y: number }[] = [];
        for (let x = 1; x <= 20; x++) {
          quadeq.push({ x, y: 2 * x * x - 5 * x + 3 });
        }
        console.log(quadeq);
      } catch (e: any) {
        console.error("Error in shorthandPropertyExample:", e.message);
      }
    }
  
    symbolExample(): void {
      try {
        const x:symbol = Symbol("2");
        const y:symbol = Symbol("2");
        console.log(x === y);
        const z = x;
        console.log(x === z);
  
        const js_obj = {
          name: "keerthana",
          age: 60,
          [Symbol.toPrimitive](hint: string) {
            if (hint === "string") return "hint over 50";
            if (hint === "number") return 59;
            return "hint btw 50-70";
          }
        };
        console.log(`${js_obj}`);
        console.log("guess again", js_obj + '');
        console.log("final guess again " + (+js_obj));
      } catch (e: any) {
        console.error("Error in symbolExample:", e.message);
      }
    }
  
    forOfLoopExample(): void {
      try {
        const arr = ['a', 'b', 'c'];
        for (const i of arr) console.log(i);
      } catch (e: any) {
        console.error("Error in forOfLoopExample:", e.message);
      }
    }
  
    classInheritanceExample(): void {
      try {
        class Jedi {
          forceIsDark: boolean;
          constructor() { this.forceIsDark = false; }
          toString(): string {
            return (this.forceIsDark ? 'join' : 'fear is the path to') + ' the dark side';
          }
        }
  
        class Sith extends Jedi {
          constructor() {
            super();
            this.forceIsDark = true;
          }
        }
  
        const yoda = new Jedi();
        const darth = new Sith();
        console.log("Yoda:", yoda.toString());
        console.log("Darth Vader:", darth.toString());
      } catch (e: any) {
        console.error("Error in classInheritanceExample:", e.message);
      }
    }
  
    arrayIteratorExample(): void {
      try {
        const it = [1, 2, 3, 4, 5][Symbol.iterator]();
        console.log(it.next());
        console.log(it.next());
        console.log(it.next());
        console.log(it.next());
        console.log(it.next());
        console.log(it.next());
      } catch (e: any) {
        console.error("Error in arrayIteratorExample:", e.message);
      }
    }
  
    customIteratorExample(): void {
      try {
        function gen(n: number) {
          return {
            [Symbol.iterator]() {
              let i = 0;
              return {
                next(): IteratorResult<number> {
                  return { done: (i > n), value: i++ };
                }
              };
            }
          };
        }
        console.log([...gen(20)]);
      } catch (e: any) {
        console.error("Error in customIteratorExample:", e.message);
      }
    }
  
    forEachSumExample(): void {
      try {
        const ratings = [5, 4, 5];
        let sum = 0;
        const syncSum = (a: number, b: number): number => a + b;
        ratings.forEach(rating => sum = syncSum(sum, rating));
        console.log(sum);
      } catch (e: any) {
        console.error("Error in forEachSumExample:", e.message);
      }
    }
  
    forEachCallbackExample(): void {
      try {
        const logArrayElements = (element: number| undefined, index: number): void => {
          console.log(`a[${index}] = ${element}`);
        };
        [2, 3, , 4].forEach(logArrayElements);
      } catch (e: any) {
        console.error("Error in forEachCallbackExample:", e.message);
      }
    }
  
    arrayEntriesExample(): void {
      try {
        const a = [...['a', 'b', 'f'].entries()];
        console.log(a);
      } catch (e: any) {
        console.error("Error in arrayEntriesExample:", e.message);
      }
    }
  
    mapExample(): void {
      try {
        const m = new Map<string, string>([...'abcd'].map(x => [x, x + x]));
        console.log(JSON.stringify([...m]));
        console.log(JSON.stringify([...m.keys()]));
        console.log(JSON.stringify([...m.values()]));
        console.log(JSON.stringify([...m.entries()]));
      } catch (e: any) {
        console.error("Error in mapExample:", e.message);
      }
    }
  
    generatorFlattenExample(): void {
      try {
        function* flatten(arr: any[]): Generator<any> {
          for (const x of arr) {
            if (x instanceof Array) yield* flatten(x);
            else yield x;
          }
        }
        const t = flatten([1, 2, [3, 4]]);
        console.log([...t]);
      } catch (e: any) {
        console.error("Error in generatorFlattenExample:", e.message);
      }
    }
  
    objectDestructuringExample(): void {
      try {
        const a = { x: 1, y: 2 };
        const { x: b, y: z } = a;
        console.log(b);
        console.log(z);
      } catch (e: any) {
        console.error("Error in objectDestructuringExample:", e.message);
      }
    }
  
    arrayDestructuringExample(): void {
      try {
        const [a, b = 3, c = 5]: (number | undefined)[] = [1, undefined];
        console.log(a);
        console.log(b);
      } catch (e: any) {
        console.error("Error in arrayDestructuringExample:", e.message);
      }
    }
  
    recursiveReverseExample(): void {
      try {
        const reverse = ([x, ...y]: any[]): any[] =>
          (y.length > 0) ? [...reverse(y), x] : [x];
        console.log(reverse("anahtreek".split("")));
        console.log(reverse([1, 2, 3, 4, 5]));
      } catch (e: any) {
        console.error("Error in recursiveReverseExample:", e.message);
      }
    }
  
    generatorSquaresExample(): void {
      try {
        function* squares(n: number): Generator<number> {
          for (let i = 1; i < n; i += 1) yield Math.pow(i, 2);
        }
        console.log([...squares(13)]);
      } catch (e: any) {
        console.error("Error in generatorSquaresExample:", e.message);
      }
    }
  }
  