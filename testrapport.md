## Tester av klasser
För att köra testerna använd npm run test i terminalen. 

### Tester av klassen CoordinateSystem 
* Konstruktorn ska kasta undantag om inga axlar anges
* Ska kasta undantag om angivet origo inte finns inom axlarnas definitionsmängd
* Ska sätta origo till (0, 0) om inget origo anges och (0, 0) är inom definitionsmängden
* Ska sätta origo till axlarnas mittpunkt om inget origo anges och (0, 0) inte är inom definitionsmängden
* Ska sätta variabeln autoAdjustOrigo till true om inget anges.
* Ska kasta undantag om autoAdjustOrigo inte är en boolean vid konstruktion
* Testar getters för fälten axisX och axisY, samt för origo
* Testar setters för axisX och axisY samt att undantag kastas om axisX eller axisY inte är av typen Axis
* Testar att funktionen contains(point) returnerar true om punkten finns koordinatsystemet och false annars

### Tester av klassen Axis
* Konstruktorn ska kasta undantag om argumenten inte är av typen Interval och ska spara ned rätt värden
* Ska sätta variabeln scale till 1 om inget anges och ska kasta undantag om scale inte är ett positivt tal och ska spara det givna värdet annars
* Ska sätta värdet på isReversed i konstruktorn till rätt default eller till det givna värdet
* Testar funktionen 'contains(value)' som ska returnera true om värdet finns i axelns definitionsmängd och false annars
* Testar så att settern range sätter rätt värde och kastar undantag om det givna värdet inte är av typen Interval

### Tester av klassen Mapper
* Konstruktorn ska kasta undantag om koordinatsystemet inte är av typen CoordinateSystem
* Vid konstruktion ska mappingRatio ställas in med korrekt värde, och vara negativt om skalorna för source och target systemen har olika riktning (isReversed).
* Testar getters för fälten sourceSystem, targetSystem, mappingRatioX och mappingRatioY

### Test av klassen/interfacet PointStrategy (i Mapper.test.js)
* Testar så att en punkt mappas korrekt från source till target systemet

### Tester av klassen Point
* Testar aå att konstruktorn kastar undantag om argumenten inte är av typen Number
* Testar funktionen equals(other) så att den returnerar true för två punkter med samma koordinater och false annars

### Övrigt 
Gjorde en simpel test-app för att undersöka om rotation fungerade som avsett och att det fungerar att zooma in. Utprovade hur det gick att jämna till axlarna om 
de har olika skala och längd. Det sista fungerar inte exakt som jag avsett ännu. Just denna del blev väldigt trial and error-aktig.

## Utskrift från testkörning

 PASS  test/classes/CoordinateSystem.test.js

 PASS  test/classes/Mapper.test.js
                                                                                                                                                                                            
 PASS  test/classes/Point.test.js

 PASS  test/classes/Axis.test.js

----------------------|---------|----------|---------|---------|---------------------------------  
                                                                                                                             
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                                                                                                                  
----------------------|---------|----------|---------|---------|---------------------------------
All files             |   55.35 |    66.25 |   55.22 |   55.35 | 
 classes              |   57.33 |    66.66 |   57.62 |   57.33 | 
  Axis.js             |   66.66 |    66.66 |   66.66 |   66.66 | 62-72,81-84
  CoordinateSystem.js |   68.75 |    67.85 |   84.61 |   68.75 | 43-45,91-96,118-123,137,159-163
  GeometryObject.js   |   31.25 |    36.36 |    37.5 |   31.25 | 8,20-35,46-50
  Interval.js         |   43.75 |       60 |   44.44 |   43.75 | 11,14,21-33,55-58
  Mapper.js           |   53.33 |    83.33 |      60 |   53.33 | 38,73-100
  Point.js            |   56.25 |     90.9 |      40 |   56.25 | 36-40,51,57-69
 strategies           |   38.88 |       50 |    37.5 |   38.88 | 
  GeometryStrategy.js |   33.33 |       50 |      25 |   33.33 | 6,14-22
  PointStrategy.js    |   41.66 |      100 |      50 |   41.66 | 28-37
----------------------|---------|----------|---------|---------|---------------------------------

Test Suites: 4 passed, 4 total

Tests:       33 passed, 33 total

Snapshots:   0 total

Time:        0.618 s, estimated 1 s

Ran all test suites.

## Saker som behöver förbättras
* Det är sannolikt fortfarande en del konstigheter kvar kring skalning av axlar med olika längd och skala. Det kan också uppstå lite oväntade resultat om man har olika långt från änden av sitt koordinatsystem till de objekt man renderar. dvs om skalan har mer tomrum åt ett håll så kan man behöva 'harmoinsera' axlarna för att få det att se bra ut. 