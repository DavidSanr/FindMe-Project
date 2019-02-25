import java.io.IOException;
import java.util.StringTokenizer;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.KeyValueTextInputFormat;
import org.apache.hadoop.mapreduce.lib.input.FileOutputFormat;

public class Dictionary{
public static class WordMapper extends Mapper<Text,Text,Text,Text>{
private Text word = new Text();
public void map(Text key, Text value, Context Context) throws IOException, InterruptedException{
StringTokenizer itr = new StringTokenizer(value.toString(),",");
word.set(itr.hasMoreTokens());
context.write(key,word);




}
}



}
