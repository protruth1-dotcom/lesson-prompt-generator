export const THEME_ICONS = {
  'Rainbow Bright': '📘',
  'Space Galaxy': '🚀',
  'Ocean Adventure': '🌊',
  'Jungle Safari': '🌿',
  'Superhero': '⭐',
  'Dinosaur World': '🦕',
  'Sports': '⚽',
};

export const pilotWorkbooks = {
  ELA: {
    '4th Grade': {
      'Compare and contrast firsthand and secondhand accounts': {
        meta: {
          id: 'ela-4-firsthand-secondhand',
          grade: 4,
          subject: 'ELA',
          standardCode: 'CCSS.ELA-LITERACY.RI.4.6',
          title: 'Firsthand & Secondhand Accounts',
          learningGoal: 'I can compare and contrast a firsthand and secondhand account of the same event and explain how the focus and information differ.',
          estimatedTime: 35,
          differentiationReady: false,
        },
        sections: {
          connect: {
            title: 'Connect',
            blocks: [
              { type: 'text', text: 'Think about the last time you told a friend about something that happened to you. Maybe you described a funny moment at recess, a field trip, or a game you played. Now imagine your friend tells someone else about that same event. Would their version sound exactly the same? Probably not! [[The person who experiences an event firsthand tells it differently than someone who only hears about it.]]' },
              { type: 'text', text: 'Write one or two sentences about an event you experienced yourself. Then think: if someone else wrote about that same event without being there, what might they leave out or get wrong?' },
            ],
          },
          learnModel: {
            title: 'Learn',
            blocks: [
              { type: 'text', text: 'A [[firsthand account]] comes from someone who was actually there. This person saw, heard, or experienced the event directly. Examples include: a diary entry from someone who lived through a storm, a speech given by a person who marched in a protest, or a letter written by an explorer describing what they discovered.' },
              { type: 'callout', calloutType: 'think-aloud', calloutLabel: 'Think Aloud', text: 'When I read a firsthand account, I ask myself: What does this person notice that someone else might miss? How do their feelings shape the way they tell the story? A firsthand account often includes emotions, sensory details (what things looked, sounded, or felt like), and personal opinions.' },
              { type: 'text', text: 'A [[secondhand account]] comes from someone who was NOT there. This person learned about the event later and is retelling it. Examples include: a textbook chapter about the American Revolution, a news article summarizing a sports game the reporter did not attend, or a biography written years after the person died.' },
              { type: 'callout', calloutType: 'remember', calloutLabel: 'Remember', text: 'Secondhand accounts are usually more factual and organized. They often include information from multiple sources, dates, and background context. But they lack the raw emotion and personal details that a firsthand account provides.' },
              { type: 'text', text: 'Let us compare two short accounts of the same event -- the first day of a new school that opened in a neighborhood.' },
              { type: 'table', tableHeaders: ['Firsthand Account', 'Secondhand Account'], tableRows: [
                ['"I woke up at 6 a.m. with butterflies in my stomach. When I walked through the front doors, the hallways smelled like fresh paint. I saw kids hugging old friends and teachers smiling. I felt nervous but excited." -- Diary of Maria, a 4th grader', '"Lincoln Elementary School opened its doors on September 3, 2024, welcoming 450 students. Principal Davis gave a welcome speech, and teachers led tours of the new building." -- Local newspaper'],
                ['Personal feelings and sensory details (butterflies in stomach, smell of paint). Uses "I."', 'Facts and numbers (students, names, features). No personal feelings. Uses third person.'],
              ] },
              { type: 'text', text: 'Notice the differences. Maria writes about how she [[felt]]. The newspaper tells [[what happened]] in an organized way. Neither is wrong -- they just serve different purposes and give different kinds of information.' },
            ],
          },
          practiceTogether: {
            items: [
              { number: 1, prompt: 'Read this sentence: "I will never forget the sound of the rocket launching -- it was louder than anything I had ever heard, and the ground shook beneath my feet." Is this a firsthand or secondhand account?', hint: 'Look for "I" and personal feelings.', answer: 'Firsthand account', explanation: 'The writer uses "I" and describes a personal sensory experience.' },
              { number: 2, prompt: 'Read this sentence: "The spacecraft launched at 3:45 p.m. Eastern Time, carrying three astronauts on a mission to the International Space Station." Firsthand or secondhand?', hint: 'Does this include personal feelings or mostly facts?', answer: 'Secondhand account', explanation: 'This sentence reports facts without personal feelings or sensory details.' },
              { number: 3, prompt: 'A student named Jordan wrote about a school play they performed in. Their younger sibling, who watched from the audience, also wrote about the play. Which account is firsthand for the experience of performing?', hint: 'Who directly experienced performing?', partialAnswer: 'The firsthand account of performing is ______ because ______.', answer: 'Jordan was the performer so their account of performing is firsthand. The sibling watched from the audience.', explanation: 'A firsthand account depends on who experienced what. Jordan experienced performing directly.' },
            ],
          },
          onYourOwn: {
            items: [
              { number: 4, prompt: 'A firefighter writes a report about a rescue. A news reporter who was NOT there writes a story using the report. Which account is firsthand for the rescue? How would they differ? Write at least 3 sentences.', answer: 'The firefighter report is firsthand with personal observations and emotions. The reporter story is secondhand -- it organizes facts but lacks raw experience.', ruledLines: 5 },
              { number: 5, prompt: 'Read these two accounts. Account A: "The storm hit at midnight. I huddled in the basement with my family as the wind howled outside. When we came up in the morning, our oak tree had fallen." Account B: "A severe thunderstorm with 70 mph winds caused damage, including fallen trees and power outages affecting 2,000 homes." Identify firsthand vs secondhand. What does each give that the other does not?', answer: 'A is firsthand (uses I, personal experience). B is secondhand (facts, statistics). A gives personal fear and specific impact. B gives the bigger picture and data.', ruledLines: 6 },
              { number: 6, prompt: 'Why might a secondhand account sometimes be MORE useful than a firsthand account? Give an example.', answer: 'A secondhand account combines multiple perspectives, provides verified facts, and gives background context. Example: studying a historical event where you want to understand causes across many people.', ruledLines: 4 },
            ],
          },
          wrapUp: {
            title: 'Wrap Up',
            blocks: [
              { type: 'text', text: '[[Key ideas:]] A firsthand account comes from someone who experienced an event directly -- it includes personal feelings and details. A secondhand account comes from someone who was not there -- it is usually more factual and organized. Neither is better -- they serve different purposes. A strong reader knows how to use both.' },
              { type: 'text', text: '[[Reflect:]] Think about a time you read a firsthand account that changed how you thought about something. What did the personal perspective add?' },
            ],
          },
          quiz: {
            title: 'Check Your Understanding',
            headerInfo: 'Name: ___________________  Date: _______________',
            questions: [
              { number: 1, questionType: 'trueFalse', question: 'A secondhand account always contains more accurate information than a firsthand account.', answer: 'False', explanation: 'Accuracy depends on the author, not the account type. A firsthand account can be equally accurate about personal experience.' },
              { number: 2, questionType: 'multipleChoice', question: 'Which is an example of a firsthand account?', options: ['A. A textbook chapter about the Civil War', 'B. A letter written by a soldier describing a battle they fought in', 'C. A Wikipedia article about the moon landing', 'D. A news summary of a council meeting'], answer: 'B', explanation: 'A soldier writing about their own battle experience is firsthand. The others are secondhand.' },
              { number: 3, questionType: 'matchTerms', question: 'Match each description to the correct term.', options: ['Account A', 'Account B'], definitions: ['Firsthand: Uses I and describes what the author saw and felt.', 'Secondhand: Reports facts about an event the author did not witness.'], answer: 'Firsthand, Secondhand', explanation: 'I and personal experience = firsthand. Reported facts = secondhand.' },
              { number: 4, questionType: 'shortAnswer', question: 'A museum exhibit about the 1963 March on Washington includes a video of Dr. King giving his speech AND a timeline of civil rights events. Which is firsthand? Which is secondhand? What does each provide?', answer: 'The video is firsthand (he is speaking at the event). The timeline is secondhand (compiled later). The video gives emotion and tone. The timeline gives context and connections.', ruledLines: 5 },
              { number: 5, questionType: 'writtenResponse', question: 'You read two accounts of a school field trip. Account 1 is by a student who went. Account 2 is by a newsletter editor who did not go but interviewed three students. Explain two likely differences. Use "firsthand" and "secondhand" in your answer.', answer: 'Account 1 is firsthand with personal feelings and specific moments. Account 2 is secondhand, combining details from multiple students with organized facts.', lookFor: 'Student identifies Account 1 as firsthand and Account 2 as secondhand. Two specific differences. Uses both terms.', ruledLines: 6 },
            ],
            answerKey: [
              { number: 1, correctAnswer: 'False', explanation: 'Accuracy depends on the author, not the account type.' },
              { number: 2, correctAnswer: 'B', explanation: 'A soldier writing about their own battle is firsthand.' },
              { number: 3, correctAnswer: 'Firsthand, Secondhand', explanation: 'I/personal = firsthand. Reported = secondhand.' },
              { number: 4, correctAnswer: 'See rubric', explanation: 'Video is firsthand; timeline is secondhand.', lookFor: 'Identifies video as firsthand and timeline as secondhand with reasoning.' },
              { number: 5, correctAnswer: 'See rubric', explanation: 'Acc 1 is firsthand, Acc 2 is secondhand. Two differences.', lookFor: 'Identifies each account type. Two clear differences. Uses both terms.', sampleResponse: 'Account 1 is firsthand because the student went on the trip. It would include things like "My favorite part was the dinosaur exhibit." Account 2 is secondhand because the editor did not go. It would sound more like "Forty-five students visited the museum on Tuesday."' },
            ],
          },
        },
        illustrations: [
          {
            required: true,
            type: 'graphic-organizer',
            visualSource: 'formatter-shape',
            purposeCategory: 'compare-classify',
            placementSection: 'learnModel',
            studentAction: 'interpret',
            labelsNeeded: true,
            printMode: 'grayscale-safe',
            teacherImageRequired: false,
            aiImageAllowed: false,
            caption: 'Two-column comparison organizer for firsthand and secondhand accounts.',
            safetyNotes: 'ELA visuals should organize evidence and differences; no generic book or pencil clip art.',
          },
        ],
      },
    },
  },
  Math: {
    '4th Grade': {
      'Compare two fractions with different numerators and denominators': {
        meta: {
          id: 'math-4-compare-fractions',
          grade: 4,
          subject: 'Math',
          standardCode: 'CCSS.MATH.CONTENT.4.NF.A.2',
          title: 'Comparing Fractions',
          learningGoal: 'I can compare two fractions with different numerators and denominators using visual models and common denominators.',
          estimatedTime: 30,
          differentiationReady: false,
        },
        sections: {
          connect: {
            title: 'Connect',
            blocks: [
              { type: 'text', text: 'You already know how to compare fractions with the same denominator. For example, 3/8 is greater than 1/8 because when the pieces are the same size, more pieces means more. You can also compare fractions with the same numerator -- 2/3 is greater than 2/5 because thirds are bigger than fifths.' },
              { type: 'text', text: 'But what happens when NEITHER the numerator NOR the denominator are the same? How would you compare 2/3 and 3/4? Today you will learn strategies to answer this question.' },
            ],
          },
          learnModel: {
            title: 'Learn',
            blocks: [
              { type: 'text', text: '[[Strategy 1: Use Visual Models]] When fractions have different denominators, drawing them can help you compare. Fraction bars and number lines show you how much each fraction represents.' },
              { type: 'diagram', diagramType: 'fraction-bar', diagramData: { bars: [
                { label: [2, 3], parts: 3, shaded: 2, color: '#2D8B8B', equivalent: [8, 12] },
                { label: [3, 4], parts: 4, shaded: 3, color: '#6C8E3F', equivalent: [9, 12] },
              ] }, caption: 'Compare 2/3 and 3/4 using fraction bars. The bars are the same total length, so the shaded parts can be compared fairly.' },
              { type: 'callout', calloutType: 'think-aloud', calloutLabel: 'Think Aloud', text: 'I draw two bars the same length. For 2/3, I split into 3 equal parts and shade 2. For 3/4, I split another bar into 4 equal parts and shade 3. When I compare, the 3/4 bar has more shaded, so 3/4 is larger.' },
              { type: 'text', text: '[[Strategy 2: Find Common Denominators]] Rewrite both fractions with the same denominator, then compare numerators.' },
              { type: 'callout', calloutType: 'tip', calloutLabel: 'Step by Step', text: 'To compare 2/3 and 3/4:\n1. Multiples of 3: 3, 6, 9, [[12]], 15...\n2. Multiples of 4: 4, 8, [[12]], 16...\n3. Common denominator: 12\n4. 2/3 = (2x4)/(3x4) = 8/12\n5. 3/4 = (3x3)/(4x3) = 9/12\n6. 8/12 < 9/12, so 2/3 < 3/4' },
              { type: 'text', text: 'Both strategies give the same answer. Use whichever helps you understand better.' },
            ],
          },
          practiceTogether: {
            items: [
              { number: 1, prompt: 'Compare 1/2 and 2/5. Use the fraction bars below. Which fraction is greater? Explain how the model helps you know.', hint: 'The bars are the same total length. Compare the shaded amounts.', answer: '1/2 is greater than 2/5', explanation: '1/2 covers more of the same-size whole than 2/5.', diagramType: 'fraction-bar', diagramData: { bars: [
                { label: [1, 2], parts: 2, shaded: 1, color: '#2D8B8B' },
                { label: [2, 5], parts: 5, shaded: 2, color: '#6C8E3F' },
              ] } },
              { number: 2, prompt: 'Compare 3/8 and 1/3 by finding a common denominator. Then write the comparison statement.', hint: 'List multiples until the same number appears in both lists. Stop when you find the first match.', partialAnswer: 'Multiples of 8: 8, 16, ____, ____\nMultiples of 3: 3, 6, 9, 12, 15, 18, 21, ____\nCommon denominator: ____\n3/8 = ____/____\n1/3 = ____/____', answer: '3/8 = 9/24 and 1/3 = 8/24, so 3/8 > 1/3', explanation: 'With common denominator 24: 9/24 is greater than 8/24.', diagramType: 'number-line', diagramData: { points: [] }, diagramCaption: 'Use this 0-to-1 number line only if it helps you check your comparison.' },
            ],
          },
          onYourOwn: {
            items: [
              { number: 3, prompt: 'Compare 5/6 and 7/8. Use the common denominator method. Show all your steps.', answer: 'LCM of 6 and 8 is 24. 5/6 = (5x4)/(6x4) = 20/24. 7/8 = (7x3)/(8x3) = 21/24. 20 < 21, so 5/6 < 7/8.', ruledLines: 4 },
              { number: 4, prompt: 'Maria ate 2/3 of her pizza. Jamal ate 3/5 of his pizza. Who ate more? Draw fraction bars.', answer: '2/3 is about 0.67 and 3/5 is 0.60. With common denominator 15: 2/3 = 10/15, 3/5 = 9/15. Maria ate more.', ruledLines: 3 },
              { number: 5, prompt: 'Order these fractions from least to greatest: 1/4, 2/5, 3/10. Explain your reasoning.', answer: 'Common denominator 20: 1/4 = 5/20, 2/5 = 8/20, 3/10 = 6/20. Order: 5/20, 6/20, 8/20. So: 1/4, 3/10, 2/5.', ruledLines: 3 },
            ],
          },
          wrapUp: {
            title: 'Wrap Up',
            blocks: [
              { type: 'text', text: '[[Key strategies:]] [[Visual models]]: Draw fraction bars or number lines. [[Common denominators]]: Rewrite both fractions with the same denominator, compare numerators. [[Benchmark fractions]]: Compare to 1/2.' },
              { type: 'text', text: '[[Reflect:]] Which strategy do you find easiest? Is there a situation where one strategy works better?' },
            ],
          },
          quiz: {
            title: 'Check Your Understanding',
            headerInfo: 'Name: ___________________  Date: _______________',
            questions: [
              { number: 1, questionType: 'multipleChoice', question: 'Which is greater: 3/5 or 4/7?', options: ['A. 3/5', 'B. 4/7', 'C. They are equal', 'D. Not enough info'], answer: 'A', explanation: '3/5 = 21/35 and 4/7 = 20/35. 21/35 > 20/35, so 3/5 > 4/7.' },
              { number: 2, questionType: 'fillBlank', question: 'To compare 2/3 and 5/8, find a common denominator. The LCM of 3 and 8 is _____.', wordBank: ['12', '16', '24', '48'], answer: '24', explanation: '24 is the smallest number divisible by both 3 and 8.' },
              { number: 3, questionType: 'trueFalse', question: 'If two fractions have the same numerator, the fraction with the smaller denominator is greater.', answer: 'True', explanation: 'Smaller denominator means bigger pieces. 3/4 > 3/8 because fourths are larger than eighths.' },
              { number: 4, questionType: 'shortAnswer', question: 'A recipe calls for 2/3 cup flour. You have a 1/2 cup measure. Is one 1/2 cup enough? Compare and explain.', answer: 'No. 1/2 = 3/6 and 2/3 = 4/6. One 1/2 cup gives 3/6 but 4/6 is needed.', ruledLines: 4 },
              { number: 5, questionType: 'labeling', question: 'Use the number line from 0 to 1. Mark and label: 1/2, 2/3, 3/4. Then write the fractions in order from least to greatest.', labels: ['1/2', '2/3', '3/4'], answer: '1/2 < 2/3 < 3/4', diagramDescription: 'Draw your number line here. Mark three points.', diagramType: 'number-line', diagramData: { points: [] } },
            ],
            answerKey: [
              { number: 1, correctAnswer: 'A', explanation: '3/5 = 21/35 and 4/7 = 20/35, so 3/5 is greater.' },
              { number: 2, correctAnswer: '24', explanation: '24 is the LCM of 3 and 8.' },
              { number: 3, correctAnswer: 'True', explanation: 'Smaller denominator = bigger pieces when numerators are equal.' },
              { number: 4, correctAnswer: 'No, 1/2 is less than 2/3', explanation: '1/2 = 3/6, 2/3 = 4/6. Not enough.', lookFor: 'Converts to common denominator, compares correctly, explains clearly.' },
              { number: 5, correctAnswer: '1/2 < 2/3 < 3/4', explanation: '1/2 = 0.50, 2/3 = 0.67, 3/4 = 0.75. Order: 1/2, 2/3, 3/4.', lookFor: 'Correctly placed points on number line and correct ordering.' },
            ],
          },
        },
        illustrations: [
          {
            required: true,
            type: 'visual-model',
            visualSource: 'formatter-shape',
            purposeCategory: 'calculate-model',
            placementSection: 'learnModel',
            studentAction: 'observe',
            labelsNeeded: true,
            printMode: 'grayscale-safe',
            teacherImageRequired: false,
            aiImageAllowed: false,
            caption: 'Fraction bars for 2/3 and 3/4 are rendered from structured data.',
            safetyNotes: 'Use equal total bar length, equal partitions, stacked fraction labels, and calm color with grayscale-safe contrast.',
          },
          {
            required: true,
            type: 'visual-model',
            visualSource: 'formatter-shape',
            purposeCategory: 'practice-support',
            placementSection: 'practiceTogether',
            studentAction: 'interpret',
            labelsNeeded: true,
            printMode: 'grayscale-safe',
            teacherImageRequired: false,
            aiImageAllowed: false,
            caption: 'Fraction bars and number lines support comparison practice without revealing final answers.',
            safetyNotes: 'Practice visuals may scaffold thinking but must not show final comparison statements.',
          },
          {
            required: true,
            type: 'visual-model',
            visualSource: 'formatter-shape',
            purposeCategory: 'assessment-support',
            placementSection: 'quiz',
            studentAction: 'complete',
            labelsNeeded: false,
            printMode: 'grayscale-safe',
            teacherImageRequired: false,
            aiImageAllowed: false,
            caption: 'Blank 0-to-1 number line for students to mark and label fractions.',
            safetyNotes: 'Do not pre-place answer ticks or labels on quiz number lines.',
          },
        ],
      },
    },
  },
  Science: {
    '4th Grade': {
      'Relationship between speed of an object and its energy': {
        meta: {
          id: 'sci-4-speed-energy',
          grade: 4,
          subject: 'Science',
          standardCode: 'NGSS.4-PS3-1',
          title: 'Speed and Energy',
          learningGoal: 'I can explain how the speed of an object affects its energy and use evidence to predict outcomes of collisions.',
          estimatedTime: 35,
          differentiationReady: false,
        },
        sections: {
          connect: {
            title: 'Connect',
            blocks: [
              { type: 'text', text: 'Have you ever rolled a ball gently, then rolled it again as hard as you could? The faster ball knocks things over more easily. Why? The answer involves [[energy]].' },
              { type: 'text', text: 'Think of an example from your own life: when did you notice that something moving faster had a bigger effect than something moving slowly?' },
            ],
          },
          learnModel: {
            title: 'Learn',
            blocks: [
              { type: 'text', text: 'Every moving object has [[kinetic energy]], the energy of motion. The faster an object moves, the more kinetic energy it has. A fast object can cause a bigger change when it hits something.' },
              { type: 'callout', calloutType: 'think-aloud', calloutLabel: 'Think Aloud', text: 'Imagine rolling a marble down a ramp. Release it higher and it moves faster at the bottom. A faster marble pushes a cup farther because it has more energy to transfer.' },
              { type: 'diagram', diagramType: 'ramp-energy', imageUrl: '/images/science-ramp-experiment.png', diagramData: { trials: [
                { label: 'Trial 1: lower release', heightLabel: '10 cm release height', speedLabel: 'slower motion', distanceLabel: 'cup moves 12 cm', distance: 'near', color: '#2D8B8B' },
                { label: 'Trial 3: higher release', heightLabel: '30 cm release height', speedLabel: 'faster motion', distanceLabel: 'cup moves 51 cm', distance: 'far', color: '#6C8E3F' },
              ] }, caption: 'The higher release point makes the marble move faster at the bottom. The faster marble transfers more energy and pushes the cup farther.' },
              { type: 'text', text: 'Scientists say: [[the faster an object moves, the more energy it has]]. Here is data from a classroom experiment:' },
              { type: 'table', tableHeaders: ['Trial', 'Release Height', 'Speed', 'Cup Moved'], tableRows: [
                ['1', '10 cm (low)', 'Slow', '12 cm'],
                ['2', '20 cm (medium)', 'Medium', '28 cm'],
                ['3', '30 cm (high)', 'Fast', '51 cm'],
              ] },
              { type: 'text', text: 'What pattern do you see? [[Higher release leads to faster speed, which means more energy, so the cup moves farther.]]' },
            ],
          },
          practiceTogether: {
            items: [
              { number: 1, prompt: 'Look at the data table. To move the cup more than 51 cm, should the marble be released higher or lower than 30 cm? Explain using the pattern.', hint: 'Look for this pattern: higher release, faster speed, farther cup movement.', answer: 'Higher than 30 cm. The pattern shows higher release height leads to faster speed and farther cup movement.' },
              { number: 2, prompt: 'A bowling ball and tennis ball roll at the SAME speed toward pins. Which knocks down more pins? Why?', hint: 'Think about mass as well as speed.', partialAnswer: 'At the same speed, the object with more ____ has more energy because...', answer: 'The bowling ball has more mass, so it has more kinetic energy at the same speed and knocks down more pins.' },
            ],
          },
          onYourOwn: {
            items: [
              { number: 3, prompt: 'A student says: "If I push a toy car harder, it will go faster and have more energy." Do you agree? Use evidence from the data table.', answer: 'Yes. Pushing harder means more speed, and more speed means more kinetic energy. The data shows higher release = faster = cup moves farther.', ruledLines: 4 },
              { number: 4, prompt: 'Design a simple experiment to test: "Does the speed of a moving object affect how much it changes another object?" List materials, steps, and how you will measure results.', answer: 'Materials: ramp, ball, cup, ruler. Steps: release ball from different heights, measure cup distance. Measure in centimeters. Farther cup = more energy.', ruledLines: 5 },
            ],
          },
          wrapUp: {
            title: 'Wrap Up',
            blocks: [
              { type: 'text', text: '[[Claim:]] Faster objects have more energy. [[Evidence:]] Marble from 30 cm (fast) moved cup 51 cm. Marble from 10 cm (slow) moved cup 12 cm. [[Reasoning:]] The faster marble had more kinetic energy to transfer to the cup.' },
              { type: 'text', text: '[[Reflect:]] Where do you see speed and energy at work in sports, on the playground, or in nature?' },
            ],
          },
          quiz: {
            title: 'Check Your Understanding',
            headerInfo: 'Name: ___________________  Date: _______________',
            questions: [
              { number: 1, questionType: 'multipleChoice', question: 'A soccer player kicks a ball softly, then kicks hard. Which kick gives the ball more kinetic energy?', options: ['A. The soft kick', 'B. The hard kick', 'C. Both the same', 'D. It depends on the ball'], answer: 'B', explanation: 'A harder kick = faster ball = more kinetic energy.' },
              { number: 2, questionType: 'shortAnswer', question: 'A toy car moving slowly pushes a block 8 cm. The same car moving fast pushes it 34 cm. What does this tell you about the car energy at each speed?', answer: 'The fast car has more kinetic energy than the slow car. The block moved farther because more energy was transferred.', ruledLines: 4 },
              { number: 3, questionType: 'trueFalse', question: 'A truck moving slowly can have more kinetic energy than a bicycle moving fast.', answer: 'True', explanation: 'Both speed and mass affect energy. A heavy truck can have more energy even at lower speed.' },
              { number: 4, questionType: 'writtenResponse', question: 'Ball A drops from 20 cm onto flour and makes a small dent. Ball B drops from 80 cm and makes a deep crater. Explain why. Use "speed" and "energy."', answer: 'Ball B fell from higher so it was faster when it hit. More speed = more kinetic energy = bigger impact (deeper crater).', lookFor: 'Connects height to speed to energy to impact. Uses both vocabulary words.', ruledLines: 5 },
              { number: 5, questionType: 'shortAnswer', question: 'Why do highway signs tell trucks to drive slowly downhill? Use what you learned about speed and energy.', answer: 'A truck going fast downhill has lots of kinetic energy. If the driver needs to stop, all that energy must go somewhere -- it takes longer to stop. Slower = less energy = safer.', ruledLines: 4 },
            ],
            answerKey: [
              { number: 1, correctAnswer: 'B', explanation: 'Harder kick = faster = more energy.' },
              { number: 2, correctAnswer: 'Fast car has more kinetic energy', explanation: '34 cm > 8 cm shows more energy transferred.' },
              { number: 3, correctAnswer: 'True', explanation: 'Both mass and speed determine kinetic energy.' },
              { number: 4, correctAnswer: 'Ball B had more speed and energy', explanation: 'Higher drop = more speed = more energy = deeper crater.', lookFor: 'Clear connection: height to speed to energy to impact. Both terms used.' },
              { number: 5, correctAnswer: 'Slower = less energy = safer stopping', explanation: 'Less kinetic energy means shorter stopping distance.', lookFor: 'Connects speed reduction to energy reduction to safety.' },
            ],
          },
        },
        illustrations: [
          {
            required: true,
            type: 'diagram',
            visualSource: 'generated-image',
            purposeCategory: 'concept-explanation',
            placementSection: 'learnModel',
            studentAction: 'observe',
            labelsNeeded: true,
            printMode: 'grayscale-safe',
            teacherImageRequired: false,
            aiImageAllowed: true,
            caption: 'Ramp model showing lower and higher release points, slower and faster motion, and near/far cup movement.',
            safetyNotes: 'Science motion concepts must not be text-only when a visual model reduces confusion.',
          },
          {
            required: true,
            type: 'data-table',
            visualSource: 'formatter-shape',
            purposeCategory: 'observe-interpret',
            placementSection: 'learnModel',
            studentAction: 'interpret',
            labelsNeeded: true,
            printMode: 'grayscale-safe',
            teacherImageRequired: false,
            aiImageAllowed: false,
            caption: 'Classroom experiment data table connecting release height, speed, and cup movement.',
            safetyNotes: 'Table supports evidence use but does not replace the ramp visual model.',
          },
        ],
      },
    },
  },
  'Social Studies': {
    '5th Grade': {
      'Three branches of U.S. federal government': {
        meta: {
          id: 'ss-5-three-branches',
          grade: 5,
          subject: 'Social Studies',
          standardCode: 'C3.D2.Civ.3.3-5',
          title: 'Three Branches of Government',
          learningGoal: 'I can identify the three branches of U.S. government and describe how they check and balance each other.',
          estimatedTime: 35,
          differentiationReady: false,
        },
        sections: {
          connect: {
            title: 'Connect',
            blocks: [
              { type: 'text', text: 'Think about your school. Who makes rules? Who enforces them? Who decides what happens when a rule is broken? These three jobs exist in your school -- and in the U.S. government, but on a much bigger scale.' },
              { type: 'text', text: 'What problems could happen if ONE person had all the power to make rules, enforce them, and judge people?' },
            ],
          },
          learnModel: {
            title: 'Learn',
            blocks: [
              { type: 'text', text: 'The U.S. Constitution created [[three branches of government]] so no single person or group has too much power. This is called [[separation of powers]]. Each branch can also limit the others -- [[checks and balances]].' },
              { type: 'table', tableHeaders: ['Branch', 'Main Job', 'Who Leads It', 'Key Power'], tableRows: [
                ['Legislative (Congress)', '[[Makes laws]]', 'Senate + House of Reps', 'Pass laws, declare war, control money'],
                ['Executive (President)', '[[Enforces laws]]', 'President + Cabinet', 'Sign/veto laws, command military'],
                ['Judicial (Courts)', '[[Interprets laws]]', 'Supreme Court + fed courts', 'Declare laws unconstitutional'],
              ] },
              { type: 'callout', calloutType: 'remember', calloutLabel: 'Remember', text: 'Legislative = Makes. Executive = Enforces. Judicial = Judges. Congress writes rules, President carries them out, Courts decide if they are fair.' },
              { type: 'text', text: '[[Checks and Balances examples:]] Congress passes a law -- President can veto it. Congress can override the veto (2/3 vote). Courts can strike down unconstitutional laws. President appoints judges -- Congress must approve them.' },
            ],
          },
          practiceTogether: {
            items: [
              { number: 1, prompt: 'Congress passes a new environmental law. Which branch made it? Which branch will enforce it?', hint: 'Who makes laws? Who enforces them?', answer: 'Legislative made the law. Executive will enforce it through agencies like the EPA.' },
              { number: 2, prompt: 'The President appoints a Supreme Court justice. The Senate votes whether to approve. Which two branches are involved? How is this checks and balances?', hint: 'Use the branch table. One branch appoints; another branch approves.', answer: 'Executive appoints, Legislative approves. This is checks and balances because the President cannot put anyone on the Court without Congress agreeing.' },
            ],
          },
          onYourOwn: {
            items: [
              { number: 3, prompt: 'A new law says all public schools must start after 9:00 a.m. Parents sue, saying it violates states rights. Which branch will hear this case and decide if the law is constitutional?', answer: 'The Judicial branch. The Supreme Court would hear the case and decide if the law follows the Constitution.', ruledLines: 3 },
              { number: 4, prompt: 'The President wants to send troops to another country. Which branch declares war? Which branch commands the military? Why did the Constitution split these powers?', answer: 'Congress (Legislative) declares war. President (Executive) commands the military. The split prevents one person from taking the country into war alone.', ruledLines: 4 },
            ],
          },
          wrapUp: {
            title: 'Wrap Up',
            blocks: [
              { type: 'text', text: '[[Three branches:]] Legislative makes laws. Executive enforces laws. Judicial interprets laws. Separation of powers prevents too much power in one place. Checks and balances let each branch limit the others.' },
              { type: 'text', text: '[[Reflect:]] Which check or balance do you think is the most important? Why?' },
            ],
          },
          quiz: {
            title: 'Check Your Understanding',
            headerInfo: 'Name: ___________________  Date: _______________',
            questions: [
              { number: 1, questionType: 'multipleChoice', question: 'Which branch declares a law unconstitutional?', options: ['A. Legislative', 'B. Executive', 'C. Judicial', 'D. All three'], answer: 'C', explanation: 'The Judicial branch has judicial review power.' },
              { number: 2, questionType: 'matchTerms', question: 'Match each job to its branch.', options: ['Makes laws', 'Enforces laws', 'Interprets laws'], definitions: ['Legislative', 'Executive', 'Judicial'], answer: 'Legislative, Executive, Judicial', explanation: 'Makes = Legislative. Enforces = Executive. Interprets = Judicial.' },
              { number: 3, questionType: 'trueFalse', question: 'The President can veto a law passed by Congress. This is checks and balances.', answer: 'True', explanation: 'The veto is a check the Executive has on the Legislative branch.' },
              { number: 4, questionType: 'shortAnswer', question: 'Why did the founders create three separate branches instead of giving all power to one person?', answer: 'To prevent any one person or group from becoming too powerful. Separating powers with checks and balances prevents tyranny.', lookFor: 'Fear of concentrated power. How separation prevents this.', ruledLines: 4 },
              { number: 5, questionType: 'writtenResponse', question: 'Congress passes a law the President disagrees with. Describe two things the President could do. Then describe one thing Congress could do in response.', answer: 'President could veto the law. Congress can override the veto with a two-thirds vote in both houses.', lookFor: 'Identifies veto as main tool. Identifies override as response. Shows understanding of back-and-forth.', ruledLines: 5 },
            ],
            answerKey: [
              { number: 1, correctAnswer: 'C', explanation: 'Judicial review = Supreme Court declaring laws unconstitutional.' },
              { number: 2, correctAnswer: 'Legislative, Executive, Judicial', explanation: 'Makes/Enforces/Interprets match the three branches.' },
              { number: 3, correctAnswer: 'True', explanation: 'Veto is a classic check: Executive on Legislative.' },
              { number: 4, correctAnswer: 'To prevent concentrated power', explanation: 'Separation with checks prevents any branch from becoming tyrannical.', lookFor: 'Preventing concentration of power.' },
              { number: 5, correctAnswer: 'Veto; Congress overrides', explanation: 'The veto-override cycle exemplifies checks and balances.', lookFor: 'Veto and override clearly identified. Interactive nature understood.' },
            ],
          },
        },
        illustrations: [
          {
            required: true,
            type: 'graphic-organizer',
            visualSource: 'formatter-shape',
            purposeCategory: 'compare-classify',
            placementSection: 'learnModel',
            studentAction: 'interpret',
            labelsNeeded: true,
            printMode: 'grayscale-safe',
            teacherImageRequired: false,
            aiImageAllowed: false,
            caption: 'Branch table comparing Legislative, Executive, and Judicial roles.',
            safetyNotes: 'Use correct civic terms and relationship-focused organizers; avoid decorative patriotic imagery.',
          },
        ],
      },
    },
  },
  'Islamic Studies': {
    '4th Grade': {
      'Surah Al-Asr: Reflection and Time': {
        meta: {
          id: 'is-4-al-asr',
          grade: 4,
          subject: 'Islamic Studies',
          standardCode: 'Quranic Studies - Tafsir Surah Al-Asr',
          title: 'Surah Al-Asr: Time and Salvation',
          learningGoal: 'I can explain the meaning of Surah Al-Asr and identify the four qualities of people who are not at loss.',
          estimatedTime: 30,
          differentiationReady: false,
        },
        sections: {
          connect: {
            title: 'Connect',
            blocks: [
              { type: 'text', text: 'Think about your day yesterday. How did you spend your time? Did you use it for things that matter -- helping someone, learning something new, doing a good deed? Or did you waste some of it?' },
              { type: 'text', text: 'Time is one of the most precious gifts from Allah. Once a minute passes, you can never get it back. Today you will learn a short but powerful surah about using time wisely.' },
            ],
          },
          learnModel: {
            title: 'Learn',
            blocks: [
              { type: 'arabic-rtl', arabicText: '\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650\n\u0648\u064e\u0627\u0644\u0652\u0639\u064e\u0635\u0652\u0631\u0650 \u0661 \u0625\u0650\u0646\u064e\u0651 \u0627\u0644\u0652\u0625\u0650\u0646\u0633\u064e\u0627\u0646\u064e \u0644\u064e\u0641\u0650\u064a \u062e\u064f\u0633\u0652\u0631\u064d \u0662 \u0625\u0650\u0644\u064e\u0651\u0627 \u0627\u0644\u064e\u0651\u0630\u0650\u064a\u0646\u064e \u0622\u0645\u064e\u0646\u064f\u0648\u0627 \u0648\u064e\u0639\u064e\u0645\u0650\u0644\u064f\u0648\u0627 \u0627\u0644\u0635\u064e\u0651\u0627\u0644\u0650\u062d\u064e\u0627\u062a\u0650 \u0648\u064e\u062a\u064e\u0648\u064e\u0627\u0635\u064e\u0648\u0652\u0627 \u0628\u0650\u0627\u0644\u0652\u062d\u064e\u0642\u0650\u0651 \u0648\u064e\u062a\u064e\u0648\u064e\u0627\u0635\u064e\u0648\u0652\u0627 \u0628\u0650\u0627\u0644\u0635\u064e\u0651\u0628\u0652\u0631\u0650 \u0663', englishTranslation: 'In the name of Allah, the Most Gracious, the Most Merciful. By time. Indeed, mankind is in loss. Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience. (Surah Al-Asr, 103:1-3)' },
              { type: 'text', text: 'This surah is only [[three verses]], but it contains one of the most important messages in the Quran. Imam Ash-Shafii, a great scholar, said: "If people reflected on this surah, it would be sufficient for them."' },
              { type: 'callout', calloutType: 'think-aloud', calloutLabel: 'Think Aloud', text: '[["By time"]] -- Allah swears by time itself. Time is the container of all our actions. When time runs out, our chance to do good deeds ends. Allah wants us to pay attention.' },
              { type: 'text', text: 'Allah tells us ALL of mankind is in [[loss]] (khusr) -- like a failing business. But then He gives the way out. [[Four qualities]] of people who are NOT at loss:' },
              { type: 'table', tableHeaders: ['Quality', 'Meaning for a Student'], tableRows: [
                ['Believe', 'Have true faith in Allah.'],
                ['Do righteous deeds', 'Act on faith with good actions.'],
                ['Advise each other to truth', 'Help others choose what is right.'],
                ['Advise each other to patience', 'Support others when doing right is hard.'],
              ] },
              { type: 'text', text: 'Notice: Faith comes first. Actions follow. But you cannot do it alone -- you need [[community]]. Truth without patience is harsh. Patience without truth is meaningless. You need both.' },
            ],
          },
          practiceTogether: {
            items: [
              { number: 1, prompt: 'Match each quality from the surah to a real-life example.', hint: 'Think about which quality each action shows.', answer: '1-Belief, 2-Righteous deeds, 3-Advis/truth, 4-Advise/patience' },
              { number: 2, prompt: 'Your friend is about to copy someone homework. Which quality from Surah Al-Asr guides you to tell them not to?', hint: 'Which quality is about helping someone choose what is right?', answer: 'Advising each other to truth. Telling your friend not to copy is encouraging them to do the right thing.' },
            ],
          },
          onYourOwn: {
            items: [
              { number: 3, prompt: 'Think about your week. Write one example of each of the four qualities you practiced or could have practiced.', answer: 'Answers vary. Examples: Belief -- made dua. Righteous deed -- helped sibling. Advising to truth -- reminded friend to be honest. Advising to patience -- comforted someone upset.', ruledLines: 6 },
              { number: 4, prompt: 'Allah says ALL mankind is in loss. How does that make you feel? Then He says "except..." -- what hope does Allah give us?', answer: 'At first it feels scary -- everyone is losing. But Allah gives a clear path: belief, good deeds, and helping each other. This is hopeful because we know exactly what to do.', ruledLines: 4 },
            ],
          },
          wrapUp: {
            title: 'Wrap Up',
            blocks: [
              { type: 'text', text: '[[Surah Al-Asr teaches:]] Time is precious. Every person is losing time unless they fill it with four things: belief, good actions, encouraging truth, and encouraging patience.' },
              { type: 'callout', calloutType: 'remember', calloutLabel: 'Practice This Week', text: 'Pick one quality to focus on. Each day, find one moment to practice it. At the end of the week, reflect: how did it change how you used your time?' },
              { type: 'text', text: '[[Reflect:]] What is one thing you spend time on that does not help you grow? What could you replace it with?' },
            ],
          },
          quiz: {
            title: 'Check Your Understanding',
            headerInfo: 'Name: ___________________  Date: _______________',
            questions: [
              { number: 1, questionType: 'fillBlank', question: 'Surah Al-Asr begins with Allah swearing by _____________. This reminds us our time on Earth is limited and precious.', wordBank: ['Time', 'The Quran', 'The Prophet', 'Prayer'], answer: 'Time', explanation: 'The surah opens with "Wal-Asr" -- "By time."' },
              { number: 2, questionType: 'multipleChoice', question: 'According to Surah Al-Asr, which group is NOT in loss?', options: ['A. People who are wealthy', 'B. People who believe, do good, and encourage truth and patience', 'C. People who pray five times a day', 'D. People who are very smart'], answer: 'B', explanation: 'The surah lists four qualities: belief, deeds, truth, patience. All needed together.' },
              { number: 3, questionType: 'trueFalse', question: 'Surah Al-Asr teaches you can be successful just by having faith, even without acting on it.', answer: 'False', explanation: 'The surah pairs belief AND righteous deeds. Faith without action is incomplete.' },
              { number: 4, questionType: 'shortAnswer', question: 'Why did Allah include "advising each other to patience"? Why is patience needed alongside truth?', answer: 'Truth can be hard to live by. Standing up for what is right requires patience. Supporting each other helps the community stay strong.', lookFor: 'Connects patience to difficulty of truth and importance of community.', ruledLines: 4 },
              { number: 5, questionType: 'writtenResponse', question: 'A friend says: "I will pray and be kind when I am older. I have plenty of time." Using Surah Al-Asr, what would you tell them?', answer: 'Time is precious and we are always losing it. We do not know how much time we have. The surah says we need BOTH belief AND action -- you cannot plan to act later. Start now.', lookFor: 'Two concepts: preciousness of time, need for belief AND action. Applied to the scenario.', ruledLines: 5, sampleResponse: 'Surah Al-Asr says "By time, mankind is in loss." Every second we waste is gone forever. We do not know if we will live to be older. The surah says we need belief AND good deeds -- waiting means missing chances we might never get back.' },
            ],
            answerKey: [
              { number: 1, correctAnswer: 'Time', explanation: '"Al-Asr" means time, the passing age.' },
              { number: 2, correctAnswer: 'B', explanation: 'All four qualities must be present.' },
              { number: 3, correctAnswer: 'False', explanation: 'Faith requires action -- they are intertwined in the surah.' },
              { number: 4, correctAnswer: 'Truth requires patience to uphold', explanation: 'Living by truth is difficult. Community support through patience is essential.', lookFor: 'Difficulty of truth + need for patience and community.' },
              { number: 5, correctAnswer: 'See rubric', explanation: 'Time is precious and we need both belief and action.', lookFor: 'Two clear references to the surah applied to the scenario.' },
            ],
          },
        },
        illustrations: [
          {
            required: true,
            type: 'arabic-text-block',
            visualSource: 'formatter-shape',
            purposeCategory: 'concept-explanation',
            placementSection: 'learnModel',
            studentAction: 'observe',
            labelsNeeded: true,
            printMode: 'grayscale-safe',
            teacherImageRequired: false,
            aiImageAllowed: false,
            caption: 'Dedicated Arabic RTL block for Surah Al-Asr with respectful translation support.',
            safetyNotes: 'Do not alter Quranic Arabic. Use RTL layout, readable Arabic font, and respectful spacing.',
          },
          {
            required: true,
            type: 'graphic-organizer',
            visualSource: 'formatter-shape',
            purposeCategory: 'reduce-text-load',
            placementSection: 'learnModel',
            studentAction: 'interpret',
            labelsNeeded: true,
            printMode: 'grayscale-safe',
            teacherImageRequired: false,
            aiImageAllowed: false,
            caption: 'Four-quality organizer for Surah Al-Asr.',
            safetyNotes: 'Use non-figurative academic organizers, not decorative religious imagery.',
          },
        ],
      },
    },
  },
};

export function getTopicV2Content(subject, grade, topic) {
  const topicKey = typeof topic === 'object' ? topic.english : topic;
  return pilotWorkbooks[subject]?.[grade]?.[topicKey] || null;
}

function normalizeTopicName(topic) {
  if (typeof topic === 'object' && topic?.arabic) return topic.english;
  if (typeof topic === 'object' && topic?.english) return topic.english;
  return String(topic || 'Selected Topic');
}

function getSubjectStrategy(subject) {
  const strategies = {
    Math: {
      verb: 'solve problems about',
      evidence: 'show your work, use a model when helpful, and explain why your answer makes sense',
      visual: 'a clean math model such as a number line, table, diagram, or organizer',
      practice: 'Try the strategy on a new problem. Label each step so someone else can follow your thinking.',
      reflection: 'Which strategy helped you most, and what mistake will you watch for next time?',
      quizTypes: ['multipleChoice', 'fillBlank', 'shortAnswer', 'writtenResponse'],
    },
    ELA: {
      verb: 'read, discuss, and write about',
      evidence: 'use words from the text, examples, and clear explanations',
      visual: 'a text evidence organizer or compare-and-contrast chart',
      practice: 'Use the sentence frame, then revise your answer so it includes evidence.',
      reflection: 'What clue, word, or sentence helped you understand the idea?',
      quizTypes: ['multipleChoice', 'trueFalse', 'shortAnswer', 'writtenResponse'],
    },
    Science: {
      verb: 'investigate and explain',
      evidence: 'use observations, cause-and-effect language, and evidence from data or models',
      visual: 'a scientific model, labeled diagram, data table, or cause-and-effect chart',
      practice: 'Use the model or data to explain what is happening and why.',
      reflection: 'What evidence supports your explanation?',
      quizTypes: ['multipleChoice', 'trueFalse', 'fillBlank', 'shortAnswer', 'writtenResponse'],
    },
    'Social Studies': {
      verb: 'analyze and explain',
      evidence: 'use people, places, dates, maps, sources, or civic vocabulary as evidence',
      visual: 'a timeline, map organizer, cause-and-effect chart, or comparison table',
      practice: 'Use the organizer to connect the topic to people, places, events, or decisions.',
      reflection: 'Why does this topic matter for communities or history?',
      quizTypes: ['multipleChoice', 'matchTerms', 'trueFalse', 'shortAnswer', 'writtenResponse'],
    },
    'Islamic Studies': {
      verb: 'understand and reflect on',
      evidence: 'use respectful vocabulary, accurate terms, and examples from daily life',
      visual: 'a non-figurative organizer, key-terms table, or respectful Arabic text block when needed',
      practice: 'Connect the idea to a real choice, habit, or reflection.',
      reflection: 'How can you apply this lesson with sincerity and good character?',
      quizTypes: ['fillBlank', 'multipleChoice', 'trueFalse', 'shortAnswer', 'writtenResponse'],
    },
  };
  return strategies[subject] || {
    verb: 'learn and explain',
    evidence: 'use examples, vocabulary, and clear reasoning',
    visual: 'a simple organizer or diagram',
    practice: 'Use the organizer to explain the topic in your own words.',
    reflection: 'What is the most important idea to remember?',
    quizTypes: ['multipleChoice', 'trueFalse', 'shortAnswer', 'writtenResponse'],
  };
}

function buildGenericWorkbookContent(subject, grade, topic) {
  const topicName = normalizeTopicName(topic);
  const strategy = getSubjectStrategy(subject);
  const gradeLabel = grade || 'Student';
  const subjectLabel = subject || 'General';
  const standardCode = `${subjectLabel} - ${gradeLabel} ready-made template`;

  const coreQuestion = `What does "${topicName}" mean, and how can you show that you understand it?`;
  const exampleQuestion = `Give one example of ${topicName}. Explain why your example fits.`;
  const evidenceQuestion = `What evidence, model, or detail would help prove your answer about ${topicName}?`;

  return {
    meta: {
      id: `generic-${subjectLabel}-${gradeLabel}-${topicName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      grade: Number.parseInt(String(gradeLabel), 10) || gradeLabel,
      subject: subjectLabel,
      standardCode,
      title: topicName,
      learningGoal: `I can ${strategy.verb} ${topicName} and explain my thinking with evidence.`,
      estimatedTime: 30,
      differentiationReady: true,
    },
    sections: {
      connect: {
        title: 'Connect',
        blocks: [
          { type: 'text', text: `Today you will study [[${topicName}]]. Start by thinking about what you already know. Where have you seen this idea before -- in class, at home, in a book, in the world, or in your community?` },
          { type: 'callout', calloutType: 'warm-up', calloutLabel: 'Warm Up', text: `Write or discuss: ${coreQuestion}` },
        ],
      },
      learnModel: {
        title: 'Learn',
        blocks: [
          { type: 'text', text: `A strong answer about [[${topicName}]] does three things: it uses the correct vocabulary, gives a clear example, and explains the reasoning.` },
          { type: 'table', tableHeaders: ['Part of Strong Thinking', 'What to Do'], tableRows: [
            ['Vocabulary', `Use important words from ${subjectLabel}.`],
            ['Example', `Give a specific example connected to ${topicName}.`],
            ['Evidence', strategy.evidence],
            ['Explanation', 'Tell how the evidence supports your answer.'],
          ] },
          { type: 'callout', calloutType: 'think-aloud', calloutLabel: 'Think Aloud', text: `When I answer a question about ${topicName}, I do not stop at a short answer. I ask: What is my evidence? What would make my answer clearer?` },
        ],
      },
      practiceTogether: {
        items: [
          { number: 1, prompt: coreQuestion, hint: 'Use the topic words and explain the idea in your own words.', partialAnswer: `${topicName} means ...`, answer: 'Answers vary. Student should define or explain the topic with accurate vocabulary.', ruledLines: 3 },
          { number: 2, prompt: exampleQuestion, hint: 'Choose an example that clearly connects to the topic.', partialAnswer: `One example of ${topicName} is ... because ...`, answer: 'Answers vary. Student should give a relevant example and explain why it fits.', ruledLines: 4 },
        ],
      },
      onYourOwn: {
        items: [
          { number: 3, prompt: strategy.practice, answer: 'Answers vary. Student should apply the topic using evidence or a model.', ruledLines: 5 },
          { number: 4, prompt: evidenceQuestion, answer: 'Answers vary. Student should identify relevant evidence, data, details, source information, or a visual model.', ruledLines: 4 },
        ],
      },
      wrapUp: {
        title: 'Wrap Up',
        blocks: [
          { type: 'text', text: `[[Key idea:]] To understand ${topicName}, use vocabulary, examples, evidence, and explanation together.` },
          { type: 'callout', calloutType: 'reflection', calloutLabel: 'Reflect', text: strategy.reflection },
        ],
      },
      quiz: {
        title: 'Check Your Understanding',
        headerInfo: 'Name: ___________________  Date: _______________',
        questions: [
          { number: 1, questionType: 'multipleChoice', question: `Which answer shows the strongest understanding of ${topicName}?`, options: ['A. A guess with no explanation', 'B. A correct idea with evidence and reasoning', 'C. A sentence copied without understanding', 'D. An unrelated example'], answer: 'B', explanation: 'Strong understanding includes a correct idea, evidence, and reasoning.' },
          { number: 2, questionType: 'trueFalse', question: `It is enough to answer a question about ${topicName} with one word and no explanation.`, answer: 'False', explanation: 'Most learning questions need explanation or evidence.' },
          { number: 3, questionType: 'fillBlank', question: `A strong response should include vocabulary, an example, and ____________.`, wordBank: ['evidence', 'a random guess', 'unrelated details', 'no reasoning'], answer: 'evidence', explanation: 'Evidence supports the answer.' },
          { number: 4, questionType: 'shortAnswer', question: `Explain ${topicName} in your own words. Include one example.`, answer: 'See rubric', lookFor: 'Accurate explanation, relevant example, clear reasoning.', ruledLines: 4 },
          { number: 5, questionType: 'writtenResponse', question: `Write a complete response about ${topicName}. Use vocabulary, evidence, and reasoning.`, answer: 'See rubric', lookFor: 'Uses topic vocabulary, provides evidence or an example, explains reasoning clearly.', ruledLines: 6 },
        ],
        answerKey: [
          { number: 1, correctAnswer: 'B', explanation: 'A strong answer includes evidence and reasoning.' },
          { number: 2, correctAnswer: 'False', explanation: 'A one-word answer usually does not show full understanding.' },
          { number: 3, correctAnswer: 'evidence', explanation: 'Evidence supports the response.' },
          { number: 4, correctAnswer: 'See rubric', explanation: 'Answers vary by topic.', lookFor: 'Accurate explanation and relevant example.' },
          { number: 5, correctAnswer: 'See rubric', explanation: 'Answers vary by topic.', lookFor: 'Vocabulary, evidence/example, and reasoning.' },
        ],
      },
    },
    illustrations: [
      {
        required: false,
        type: 'graphic-organizer',
        visualSource: 'placeholder',
        purposeCategory: 'reduce-text-load',
        placementSection: 'learnModel',
        studentAction: 'interpret',
        labelsNeeded: false,
        printMode: 'grayscale-safe',
        teacherImageRequired: false,
        aiImageAllowed: false,
        caption: `Organizer idea: ${strategy.visual}.`,
        safetyNotes: `Use this space if a visual would help students understand ${topicName}.`,
      },
    ],
  };
}

export function buildWorkbookV2Data(formState) {
  const { grade, subject, topic, studentLevel = 'On Level', theme = 'Rainbow Bright' } = formState;
  const topicKey = typeof topic === 'object' ? topic.english : topic;
  const content = getTopicV2Content(subject, grade, topicKey) || buildGenericWorkbookContent(subject, grade, topic);

  const themeIcon = THEME_ICONS[theme] || THEME_ICONS['Rainbow Bright'];

  return {
    meta: {
      ...content.meta,
      themeIcon,
      studentLevel,
      lessonLength: 'Medium',
    },
    sections: content.sections,
    illustrations: content.illustrations || [],
  };
}
