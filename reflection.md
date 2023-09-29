# Reflektion

## Kap 2

| Namn och förklaring                     | Reflektion och regler från Clean Code       
|-----------------------------------------|----------------------------------------|
|resizeCanvasIfNeeded                     | **Dont add gratuitous context**        |
|Metodnamn på en metod som                | Typ lite så. 'IfNeeded' är otydligt.   |
|kontrollerar och justerar                | Den kunde lika gärna heta resizeCanvas |
|canvasens höjd så att bredd-             | eller delas upp i två metoder.         |
|höjd förhållandet matchar det            |                                        |
|som grund-koordinatsystemet              |                                        |                                 
|har.                                     |                                        |
|-----------------------------------------|----------------------------------------| 
|changeSourceAxesIntervals                | **Pick one word per concept**          |
|Metodnamn som ändrar axlarnas intervall  | Eftersom jag använde resize.. ovan så  |
|                                         | borde jag kanske valt att hålla mig    |
|                                         | till samma ordval.                     |
|                                         | **Use intention revealing name**       |
|                                         | Man skulle kunna påstå att det         |
|                                         | är ett försök till det i alla fall.    |
|-----------------------------------------|----------------------------------------|
| updateMappingRatios()                   | **Use intention revealing names**      |
| Metod som gör vad den heter. Hette dock | Den gör vad den heter.                 |
| tidigare initializeMappingRatios()      | Det tidigare namnet fick det att låta  |
|                                         | som att den bara gjorde detta vid      |
|                                         | konstruktion.                          |
|-----------------------------------------|----------------------------------------|
| harmonizeScales()                       | **Use problem domain names**           |
| Metod i klassen Renderer som jämnar ut  | Detta är ett försök till det men jag   |
| skalorna på axlarna om de har olika     | är inte säker på om det lyckades. Jag  |
| längd och skala.                        | tror att det finns något mer           |
|                                         | specifikt begrepp inom matematiken.    |
|-----------------------------------------|----------------------------------------|
| Point                                   | **Use problem domain names**           |
| Klassnamn                               | Detta heter i varje fall så.           |
|                                         | **Använd substantiv för klasser**      |
|                                         | Detta är ett substantiv.               |
|-----------------------------------------|----------------------------------------|

Jag försökte följa råden i boken och vara konsekvent och tydlig. Just det gick väl ganska bra. Det är några namn som är lite långa. 

## Kap 3
Jag klarar inte att göra detta i en tabell så det får bli punktform.
De fem längsta funktionerna i projektet är:

1. renderObject(polygon, canvasContext) i src/strategies/PolygonStrategy.js
Denna dyadiska funktion bryter mot 'Blocks and Indenting' rådet. Den borde kanske brytas upp i två funktioner men jag kan inte se hur det skulle gå till. Jag känner för övrigt på mig att det den gör går att göra på ett bättre sätt och dessutom är sammanhanget den finns i lite problematiskt. 
```js
renderObject(polygon, canvasContext) {
    let isFirst = true;
    let firstPoint = null;
    for (const p of polygon.listOfPoints) {
      p.renderObject(canvasContext);
      if (isFirst) {
        canvasContext.beginPath;
        canvasContext.moveTo(p.x, p.y);
        firstPoint = p;
        isFirst = false;
      }
      canvasContext.lineTo(p.x, p.y);
    }
    canvasContext.lineTo(firstPoint.x, firstPoint.y);
    canvasContext.stroke();
  }
```
2. harmonizeScales() i src/classes/Renderer.js
Denna funktion hade jag problem med att få till, mest på grund av att det var krångligt att utifrån mitt sätt att utföra det jag ville. Detta gjorde det lite komplicerat att greppa vad det egengligen var som behövde hända. Det dunkelt sagda är det dunkelt tänkta. Behovet av for-loopen är inte helt självklart och det är för att jag inte riktigt greppar varför den behövs, jag vet bara att den behövs på grund av att jag provade mig fram till att den behövdes. 
**Have no side effects**
Det står att den harmoniserar skalorna men i försöket att åstadkomma det så är den och pillar på många olika delar vilket är svårt att följa med i, även om jag försökt att använda egna funktioner för varje moment.  

```js
    harmonizeScales() {

    for (let i = 0; i < 2; i++) {
      this.#mapper.harmonizeSourceScales();
      this.mapper.changeSourceAxesIntervals(this.#getMinXOfObjects(), this.#getMaxXOfObjects(), this.#getminYOfObjects(), this.#getMaxYOfObjects());
    }
    this.#mapper.harmonizeTargetScales();
    this.clearMappedObjects();
    this.mapObjects();
    this.#addOldRotationOnChange();
    this.#resizeCanvasIfNeeded(this.#canvasContext.canvas, this.#mapper.sourceSystem);
    this.renderOnCanvas();
  }
```
3. constructor(coordinateSystem, canvasElement) i src/classes/Renderer.js
Jag har inte så många långa funktioner. Denna är lite lång för att den validerar input. 
```js
    constructor(coordinateSystem, canvasElement) {
    if (!(canvasElement instanceof HTMLCanvasElement)) {
      throw new Error('The argument has to be a HTMLCanvasElement');
    } else {
       this.#resizeCanvasIfNeeded(canvasElement, coordinateSystem);
      this.#canvasContext = canvasElement.getContext('2d');
      // Create the Mapper
      this.#initializeMapper(coordinateSystem, canvasElement);
    }
  }
  ```
4. set y(newAxis) i src/classes/CoordinateSystem.js
Denna setter blir komplicerad mest på grund av att jag utgick från att det behövde finnas ett attribut origo. Jag insåg att det inte var nödvändigt att ha egentligen för mina syften och gjorde då så att det kunde ställas in automatiskt. Lite onödigt. Hur som helst ledde till ett korkat beslut inser jag just nu. Jag utgick ifrån att man i ett koordinatsystem kan omdefiniera origo från det vanliga (0, 0) men råkade då dra slutsatsen att det behövde finnas ett inom de axlar man använder. Det var ju fel och jag har ändå inte använt origot till något och borde ta bort de funktioner som har med det att göra. Men detta var bakgrunden till att denna setter kontrollerar om origo finns inom axlarnas definitionsmängd och kastar undantag om man har definierat ett eget origo och sedan ändrar axlarna så att origo inte finns inom definitionsmängden. Men nu när det ändå finns så kan jag ju passa på att granska den.

**Do one thing**
Denna gör inte en sak, eller? Den validerar att allt är korrekt innan den sätter värdet och det är ju vad den ska göra. Jag såg nog inget enkelt sätt att bryta upp den här funktionen i flera funktioner. Kanske kunde man göra en egen klass för att hantera origo och då skulle denna funktion kunna bli kortare. Men jag tyckte att det var onödigt att skapa en klass för origo när jag inte använder det till något. Att det var dumt tänkt från början är en annan sak, givet det jag då försökte uppnå så tycker jag ändå att den är rimlig.
**One level of abstraction per function** 
Den håller sig på ungefär samma abstraktionsnivå hela tiden. Lite tilldelning till origo där vilket kanske är något mindre abstrakt men jag tyckte att det blev tydligare att tilldela det såhär med en metod som returnerar en punkt istället för att ändra namn på getSuitableOrigoForAxis() till setSuitableOrigoForAxis() och låta den ordna tilldelningen i en annan funktion. 

  ```js	
    set y(newAxis) {
    this.#validateAxis(newAxis);
    if (!newAxis.contains(this.origo.y)) {
      if (this.#autoAdjustOrigo) {
        this.#y = newAxis;
        this.origo = this.#getSuitableOrigoForAxis();
      }
      else {
        throw new Error('The origo must be within the range of the axis, or autoAdjustOrigo must be set to true');
      }
    }
    else {
      this.#y = newAxis;
    }
  }
  ```

  5. updateMappingRatios() i src/classes/Mapper.js
    Denna funktion blir lite svårare att förstå pga att det blir mer text då jag tydligen ville ha en slags skalningsfunktion av axlarna och därmed måste ta med dem i beräkningen. 

    **Dont repeat yourself**
    Här är ju två händelser där samma typer går igenom samma sak, det hade kanske varit ett alternativ att göra en funktion som räknar ut ett mappingratio i allmänhet som kan användas för att tilldela till både x och y. Jag tror att skälet till att jag inte gjorde det var att den funktionen skulle behöva ta emot många parametrar. 

  ```js	  
  updateMappingRatios() {
    this.#MappingRatioX =
      ((this.targetSystem.x.range.intervalLength / this.sourceSystem.x.scale)) /
      ((this.sourceSystem.x.range.intervalLength / this.targetSystem.x.scale));

    if (this.sourceSystem.x.isReversed !== this.targetSystem.x.isReversed) {
      this.#MappingRatioX *= -1;
    }

    this.#MappingRatioY =
      ((this.targetSystem.y.range.intervalLength / this.sourceSystem.y.scale)) /
      ((this.sourceSystem.y.range.intervalLength / this.targetSystem.y.scale));

    if (this.sourceSystem.y.isReversed !== this.targetSystem.y.isReversed) {
      this.#MappingRatioY *= -1;
    }
  }
  ```

  ## Reflektion om egen kodkvalitet
  Jag tycker att det gått bra att tänka på namngivning och att försöka göra funktioner korta och enkla. Jag har inte så många långa funktioner även om det inte är enligt boken än. Mitt problem med denna kod är att jag tror den är klurig för att jag antagligen har gjort själva grundupplägget lite naivt. Jag har inte gjort egna sätt att hantera koordinatsystem tidigare utan bara tänkte på saken och skissade på vad som kunde behövas och satte igång. Tror jag skulle gjort en del andra val om jag började om. 

  En sak jag tvekade mycket på var tidigare switch satser där jag behövde kontrollera alla objekt som användaren gjort för att bestämma typen så att en punkt kunde åka till punktmappningsfunktionen, en cirkel till cirkelmappning osv. Samma sak med rotation. Några switchsatser blev det och det är ju lite tabu neligt boken. Jag valde därför att testa att ge mig på någon form av egenkomponerad hybrid mellan strategy och visitor pattern. Det ledde ju glädjande nog åt att jag blev av med switch satserna, men koden kan ha blivit en smula mer obegriplig ändå på grund av att vissa delar av jobbet sköts av strategi-klasserna. Det kändes också fel att lägga hantering av mappning och rendering och så vidare, i respektive geometriskt objekts klass, eftersom jag tyckte att ett geometriskt objekt inte ska bry sig om sånt. Det fick bli en kompromiss som innebar att de bara vet att de har en eventuell genrell strategi. På sätt och vis bra men kan vara lite svårt att förstå och det krävs att man kollar en liten stund på det innan man är med på hur just jag lagt upp det här. Det var ingen optimal lösning men jag ville prova något nytt.

  I övrigt är det en del beroenden som stör mig. Jag försökte åstadkomma att de ska vara fint skiktade ändå så att det hela tiden är en klass av högre abstraktion som känner till eller består av mer grundläggande delar men helst inte tvärtom. Jag använde också attribut mer än parametrar så ofta jag kunde. 

  Jag har inte gått igeon och lagt alla funktioner i någon tydlig ordningsföljd, bara försökt lyfta upp en del viktiga till början. Jag har troligen missat att kommentera någon publik metod. Det klassdiagram som finns i image-mappen är hur det var innan jag ändrade och lade till strategi/visitorblandningsmönstret. Det ser lite annorlunda ut nu.