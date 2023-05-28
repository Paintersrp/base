## Data Structure

```jsx
{
    ColorQuestionsPoll: {
        poll_options: {
            style: "List",
            listStyle: "Numbered",
        },
        poll_questions: {
            question_one: {
                type: "Single",
                num_votes: 1,
                question: "Favorite Color?",
                options: ["Blue", "Red", "Green", "Yellow"]
            },
            question_two: {
                type: "Multiple",
                num_votes: 3,
                question: "Favorite Color Pair?",
                options: ["Blue", "Red", "Green", "Yellow"]
            }
        }
    }
}
```

The above is an example a Poll that might be built following your current build design. This Poll object would be saved to the backend, where it could be loaded in the frontend. The frontend would receive this poll object, and create a Poll based on the options and questions. It would use the poll_options to determine the style and innerStyle (in the above case List and Numbered) where it would render a List with Numbered Style list items. It would then map each poll_question object in poll_questions creating the input's available based on the options.

```jsx
question_one: {
    type: "Single",
    num_votes: 1,
    question: "Favorite Color?",
    options: ["Blue", "Red", "Green", "Yellow"]
},
```

For example would create a

```jsx
<input type={type === "Single" ? "radio" : "checkbox"} value={option} />
```

for each option in options. As seen here:

```jsx
<ol
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  {options.map((option) => {
    return (
      <Flexer w="100%" fd="row" a="center">
        <li>
          <span style={{ display: "flex", alignItems: "center" }}>
            <input
              name="answer"
              onChange={handleChange}
              type={type === "Single" ? "radio" : "checkbox"}
              value={option}
            />
            <HelpText>{option}</HelpText>
          </span>
        </li>
      </Flexer>
    );
  })}
</ol>
```

It's important to understand the data structure for what you're building. At first it may be helpful to define it ahead of time but eventually you'll start to map out the data structure in your head more. This above data structure refers to the Poll itself, rather than what will be submitted by the user. The user will use the structure created by the above Poll/Poll Object in order to submit their poll data. In this case, that submission data to the backend looks something like:

```jsx
{
  "Favorite Color?": {
    answer: ["Blue"];
  }
  "Favorite Color Pair?": {
    answer: ["Blue", "Yellow"];
  }
}
```

When the backend receive the above submit object, it can save the object which contains the question answered and the answers themselves for each. You can structure the data however you want, this data structure is a little more verbose than necessary just for demonstration purposes but there's nothing wrong with being verbose and clear either.

## Data Handling

```jsx
const handleChange = (e) => {
  if (formData.type === "Multiple") {
    const existingValues = submitFormData[e.target.name] || [];
    const updatedValue = existingValues.includes(e.target.value)
      ? existingValues.filter((value) => value !== e.target.value)
      : [...existingValues, e.target.value];

    console.log("New Value: ", updatedValue);

    setSubmitFormData({
      ...submitFormData,
      [e.target.name]: updatedValue,
    });
  } else {
    console.log("New Value: ", e.target.value);
    setSubmitFormData({
      ...submitFormData,
      [e.target.name]: [e.target.value],
    });
  }
};
```

This is the current handleChange I added. It first checks the formData.type, and if it's multiple it applies:

```jsx
// Existing values is a variable which holds either the previous answer for the current question, or an empty array if none exists.
const existingValues = submitFormData[e.target.name] || [];

// Updated value is a variable which holds the new value to be updated to the e.target.name.
// For reference, e.target.name is whatever is in the input name prop.
// <input
//   name="This is the Event Target Name"
// />;
// If the e.target.value already exists in existingValues, remove it instead of adding it. If not, add it.
const updatedValue = existingValues.includes(e.target.value)
  ? existingValues.filter((value) => value !== e.target.value)
  : [...existingValues, e.target.value];

console.log("New Value: ", updatedValue);

// Set the Submit Form Data to a new data object, which is all of ...submitFormData, with the updated value being set to [e.target.name] within submitFormData
setSubmitFormData({
  ...submitFormData,
  [e.target.name]: updatedValue,
});
```

So if submitFormData is as follows:

```jsx
{
    "Favorite Color?": {
        answer: []
    }
}
```

and the user selects "Blue" on an input checkbox with the name="answer", the new submitFormData object would be:

```jsx
{
    "Favorite Color?": {
        answer: ["Blue"]
    }
}
```

If blue where unchecked, it would revert back to an empty array []. If green were checked along with blue, the submitFormData would be:

```jsx
{
    "Favorite Color?": {
        answer: ["Blue", "Green"]
    }
}
```

Currently the handleChange isn't set up to handle multiple questions, because that functionality isn't set up on the component yet but once it is the adjustments are simple. We can look at that later.

There are still some issues with swapping the question type from single to multiple in regards to the handleChange, but these won't exist once you separate the Poll Building and the Poll Taking, as they should be handled separately. Meaning, that once the user is taking the Poll they will never be changing the questions or question type so if you keep them together you will have to write a lot of logic to handle the potential overlap that shouldn't exist

## Full Component Reference

```jsx
export default function Pollv2() {
  const [formData, setFormData] = useState(initialPollFormData);
  const [submitFormData, setSubmitFormData] = useState([]);
  const [optionVal, setOptionVal] = useState(null);
  const [voteBtn, setVoteBtn] = useState(false);
  const [vote, setVote] = useState();
  const [results, setResults] = useState();
  const [display, setDisplay] = useState();

  useEffect(() => {
    console.log(vote);
  }, [vote]);

  const changeFormData = (e) => {
    handleDataChange(e, setFormData, formData);
    console.log(formData);
  };

  const handleOption = (e) => {
    setOptionVal(e.target.value);
  };

  const addOption = (e) => {
    setVoteBtn(true);
    setFormData({
      ...formData,
      options: [...formData.options, optionVal],
    });
    setOptionVal("");
    console.log([...formData.options, optionVal]);
    console.log(formData);
  };

  const handleVote = (e) => {
    e.preventDefault();
    console.log(vote);
    if (vote.single !== undefined) {
      setResults(vote.single);
    } else {
      setResults(vote.multiple);
    }
  };

  const handleChange = (e) => {
    if (formData.type === "Multiple") {
      const existingValues = submitFormData[e.target.name] || [];
      const updatedValue = existingValues.includes(e.target.value)
        ? existingValues.filter((value) => value !== e.target.value)
        : [...existingValues, e.target.value];

      console.log("New Value: ", updatedValue);

      setSubmitFormData({
        ...submitFormData,
        [e.target.name]: updatedValue,
      });
    } else {
      setSubmitFormData({
        ...submitFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    setDisplay(results);
  }, [results]);

  return (
    <BaseBuilder header="Poll Builder" headerType="h2">
      <BaseSection
        header="Poll Settings"
        headerAlign="center"
        justifyChildren="center"
        pad={0}
        boxShadow={0}
      >
        <MappedSelectField
          value={formData.style}
          name="style"
          onChange={changeFormData}
          helpText="Select Style"
          optionsArray={styleOptions}
        />
        {formData.style === "List" && (
          <MappedSelectField
            value={formData.listStyle}
            name="listStyle"
            onChange={changeFormData}
            helpText="Select List Style"
            optionsArray={listStyleOptions}
          />
        )}
        {formData.style === "Tile" && (
          <MappedSelectField
            value={formData.tileStyle}
            name="tileStyle"
            onChange={changeFormData}
            helpText="Select Tile Style"
            optionsArray={tileStyleOptions}
          />
        )}
        <HelpText>Create a Question</HelpText>
        <FormField
          required
          id="question"
          value={formData.question}
          onChange={changeFormData}
        />
        <MappedSelectField
          value={formData.type}
          name="type"
          onChange={changeFormData}
          helpText="Select Type"
          optionsArray={typeOptions}
          firstOptionText="Select Type"
        />
        {formData.type === "Multiple" && (
          <MappedSelectField
            value={formData.votes}
            name="votes"
            onChange={changeFormData}
            helpText="Select Number of Votes"
            optionsArray={Array.from({ length: 4 }, (_, i) => ({
              label: `${i + 1}`,
              value: `${i + 1}`,
            }))}
          />
        )}
        <HelpText>Type in Option</HelpText>
        <FormField
          required
          value={optionVal}
          onChange={handleOption}
          fullWidth
        />
        <Flexer mt={8} j="fe">
          <AddButton label="Option" addFunc={addOption} disabled={!optionVal} />
        </Flexer>
      </BaseSection>
      <BaseSection
        header="Poll Preview"
        headerAlign="center"
        fd="column"
        justifyChildren="center"
        alignChildren="center"
        pad={2}
        boxShadow={1}
        pt={2}
      >
        <Text a="c" t="h4" mt={8} mb={-10}>
          {formData.question}
        </Text>
        <form
          onSubmit={handleVote}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {formData.style === "List" && (
            <Pollv2List
              style={formData.listStyle}
              options={formData.options}
              type={formData.type}
              vote={setVote}
              handleChange={handleChange}
            />
          )}
          {formData.style === "Tile" && (
            <Pollv2Tile
              style={formData.tileStyle}
              options={formData.options}
              type={formData.type}
            />
          )}
          <Flexer j="c">
            {voteBtn && (
              <button
                type="submit"
                style={{
                  padding: "5px",
                  letterSpacing: "1.2px",
                  fontWeight: 600,
                  borderRadius: "4px",
                }}
              >
                Vote
              </button>
            )}
          </Flexer>
        </form>
      </BaseSection>

      <div>
        <p>{display}</p>
      </div>
    </BaseBuilder>
  );
}
```

---
