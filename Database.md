# Setup

1. Create the three php scripts;
2. Execute `create-table.php`;
3. Execute `add-message.php`; and,
4. Execute `read-messages.php`.

## Practice

1. Try creating your own table.
2. Try running a few INSERT queries.
3. Learn how to do a few SELECT queries.
4. Learn how to use the WHERE clause in SELECT.

General PDO guide: https://phpdelusions.net/pdo

Learn SQL from this website. https://www.sqlitetutorial.net/

# Scripts

create-table.php

```php
<?php
/**
 * NOTE: This code example doesn't utilize any best security practices for sake
 * of brevity. This code is for informational purposes only. DO NOT USE THIS
 * CODE FOR ANY OTHER PURPOSES WHATSOEVER.
 */

// the location of the database
$dbFileLocation = __DIR__ .'/my-database.sqlite3';

// open a database connection
$db = new PDO("sqlite:$dbFileLocation");

// delete the SQL table, if it exist
$stmt = $db->prepare('
    DROP TABLE IF EXISTS message;
');

// execute the above SQL Statement
$stmt->execute();

// then create a new SQL table
$stmt = $db->prepare('
CREATE TABLE message (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT NOT NULL,
   message TEXT NOT NULL
);
');

// execute the above SQL Statement
$stmt->execute();
```

add-message.php

```php
<?php
/**
 * NOTE: This code example doesn't utilize any best security practices for sake
 * of brevity. This code is for informational purposes only. DO NOT USE THIS
 * CODE FOR ANY OTHER PURPOSES WHATSOEVER.
 */

// the location of the database
$dbFileLocation = __DIR__ .'/my-database.sqlite3';

// open a database connection
$db = new PDO("sqlite:$dbFileLocation");

// option: change how errors are made
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// option: stop the emulation of prepared statements, use REAL prepared
// statements instead
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

// option: from here on out, each table record fetched will use the table's
// column names by default
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$status = '';

// detect when the form is submitted using the post method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // execute the prepared statement, but with named parameters (placeholders), each
    // named parameter is prefixed by the colon mark `:`
    $stmt = $db->prepare('INSERT INTO message (name, message) VALUES (:name, :message)');

    // execute the prepared statement, AND ALSO,
    // Pair each named parameter (placeholder) with its respective value
    $stmt->execute([
        'name' => $_POST['name'],
        'message' => $_POST['message'],
    ]);

    $status = 'Message added';
}

if (!empty($status)): ?>
    <p><?= $status ?></p>
<?php endif; ?>
<form method="post">
    <div>Name: <input name="name" type="text" /></div>
    <div>Message</div>
    <div><textarea name="message"></textarea></div>
    <div><button type="submit">Add message</button>
</form>
```

read-messages.php

```php
<?php
/**
 * NOTE: This code example doesn't utilize any best security practices for sake
 * of brevity. This code is for informational purposes only. DO NOT USE THIS
 * CODE FOR ANY OTHER PURPOSES WHATSOEVER.
 */

// the location of the database
$dbFileLocation = __DIR__ .'/my-database.sqlite3';

// open a database connection
$db = new PDO("sqlite:$dbFileLocation");

// option: change how errors are made
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// option: stop the emulation of prepared statements, use REAL prepared
// statements instead
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

// option: from here on out, each table record fetched will use the table's
// column names by default
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

// read the first 50 rows from the `message` table
$stmt = $db->prepare('SELECT id, name, message FROM message LIMIT 50');

// execute the prepared statement
$stmt->execute();

// store the data into the variable
$tableRecords = $stmt->fetchAll();

?>
<h1>Messages</h1>
<table border="1">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Message</th>
    </tr>
    <?php foreach ($tableRecords as $tableRecord): ?>
        <tr>
            <td><?= $tableRecord['id'] ?></td>
            <td><?= $tableRecord['name'] ?></td>
            <td><?= $tableRecord['message'] ?></td>
        </tr>
    <?php endforeach; ?>
</table>
```
